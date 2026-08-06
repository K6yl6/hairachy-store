const PAYSTACK_VERIFY_URL =
  "https://api.paystack.co/transaction/verify";

function sendJson(response, statusCode, payload) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(statusCode).json(payload);
}

function parseMetadata(value) {
  if (!value) {
    return {};
  }

  if (typeof value === "object") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

export default async function handler(
  request,
  response
) {
  response.setHeader("Allow", "GET");

  if (request.method !== "GET") {
    return sendJson(response, 405, {
      message: "Method not allowed.",
    });
  }

  const secretKey =
    process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    console.error(
      "PAYSTACK_SECRET_KEY is missing."
    );

    return sendJson(response, 500, {
      message:
        "Payment verification is temporarily unavailable.",
    });
  }

  const reference = String(
    request.query?.reference || ""
  ).trim();

  if (
    !reference ||
    !/^[A-Za-z0-9.\-=]+$/.test(
      reference
    )
  ) {
    return sendJson(response, 400, {
      message:
        "A valid transaction reference is required.",
    });
  }

  try {
    const paystackResponse =
      await fetch(
        `${PAYSTACK_VERIFY_URL}/${encodeURIComponent(
          reference
        )}`,
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${secretKey}`,
          },
        }
      );

    const paystackPayload =
      await paystackResponse
        .json()
        .catch(() => null);

    if (
      !paystackResponse.ok ||
      !paystackPayload?.status ||
      !paystackPayload?.data
    ) {
      console.error(
        "Paystack verification failed:",
        paystackPayload
      );

      return sendJson(response, 502, {
        verified: false,
        message:
          paystackPayload?.message ||
          "Could not verify the payment.",
      });
    }

    const transaction =
      paystackPayload.data;

    const metadata =
      parseMetadata(
        transaction.metadata
      );

    const expectedAmount =
      Number(
        metadata.expectedAmountPesewas
      );

    const paidAmount =
      Number(transaction.amount);

    const amountMatches =
      Number.isSafeInteger(
        expectedAmount
      ) &&
      expectedAmount > 0 &&
      paidAmount === expectedAmount;

    const currencyMatches =
      transaction.currency === "GHS";

    const paymentSucceeded =
      transaction.status === "success";

    const verified =
      paymentSucceeded &&
      amountMatches &&
      currencyMatches;

    if (
      paymentSucceeded &&
      !verified
    ) {
      console.error(
        "Successful Paystack payment failed local validation:",
        {
          reference,
          expectedAmount,
          paidAmount,
          currency:
            transaction.currency,
        }
      );
    }

    return sendJson(response, 200, {
      verified,
      status: transaction.status,
      reference:
        transaction.reference,
      amountGhs:
        Number.isFinite(paidAmount)
          ? paidAmount / 100
          : 0,
      currency:
        transaction.currency,
      paidAt:
        transaction.paid_at ||
        transaction.paidAt ||
        null,
      channel:
        transaction.channel || null,
      message: verified
        ? "Payment verified."
        : paymentSucceeded
          ? "Payment details did not match the order."
          : "Payment has not been completed.",
      customer:
        metadata.customer || null,
      items:
        Array.isArray(metadata.items)
          ? metadata.items
          : [],
      delivery:
        metadata.delivery ||
        "Delivery is arranged separately.",
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return sendJson(response, 500, {
      verified: false,
      message:
        "Could not verify the payment.",
    });
  }
}
