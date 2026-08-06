import { randomBytes } from "node:crypto";

import products from "../../src/data/products.js";

const PAYSTACK_INITIALIZE_URL =
  "https://api.paystack.co/transaction/initialize";

const MAX_ITEM_QUANTITY = 20;

function sendJson(response, statusCode, payload) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(statusCode).json(payload);
}

function cleanText(value, maxLength = 200) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function parseRequestBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  return request.body;
}

function getSiteUrl(request) {
  const configuredSiteUrl = cleanText(
    process.env.SITE_URL,
    500
  );

  if (configuredSiteUrl) {
    const url = new URL(configuredSiteUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("SITE_URL must use http or https.");
    }

    return url.origin;
  }

  const origin = cleanText(
    request.headers.origin,
    500
  );

  if (origin) {
    const url = new URL(origin);

    if (["http:", "https:"].includes(url.protocol)) {
      return url.origin;
    }
  }

  const host = cleanText(
    request.headers["x-forwarded-host"] ||
      request.headers.host,
    500
  );

  const protocol = cleanText(
    request.headers["x-forwarded-proto"] ||
      "https",
    20
  );

  if (!host) {
    throw new Error(
      "Could not determine the website URL."
    );
  }

  return `${protocol}://${host}`;
}

function getColorCode(item) {
  if (typeof item?.color === "string") {
    return cleanText(item.color, 30);
  }

  return cleanText(
    item?.colorCode ||
      item?.color?.code,
    30
  );
}

function buildOrderItems(cart) {
  const productMap = new Map(
    products.map((product) => [
      product.id,
      product,
    ])
  );

  return cart.map((rawItem, index) => {
    const productId = cleanText(
      rawItem?.id,
      100
    );

    const product = productMap.get(productId);

    if (!product) {
      throw new Error(
        `Cart item ${index + 1} is not a valid product.`
      );
    }

    const quantity = Number(
      rawItem?.quantity
    );

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_ITEM_QUANTITY
    ) {
      throw new Error(
        `${product.name} must have a quantity between 1 and ${MAX_ITEM_QUANTITY}.`
      );
    }

    const colorCode =
      getColorCode(rawItem);

    const selectedColor =
      product.colors?.find(
        (color) =>
          color.code === colorCode
      );

    if (!selectedColor) {
      throw new Error(
        `Select a valid color for ${product.name}.`
      );
    }

    const unitPrice =
      Number(product.price);

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice <= 0
    ) {
      throw new Error(
        `${product.name} has an invalid catalogue price.`
      );
    }

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      colorCode: selectedColor.code,
      colorName: selectedColor.name,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    };
  });
}

export default async function handler(
  request,
  response
) {
  response.setHeader("Allow", "POST");

  if (request.method !== "POST") {
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
        "Payment is temporarily unavailable.",
    });
  }

  try {
    const body =
      parseRequestBody(request);

    const customer = body.customer || {};
    const cart = body.cart;

    const fullName = cleanText(
      customer.fullName,
      120
    );

    const email = cleanText(
      customer.email,
      160
    ).toLowerCase();

    const phone = cleanText(
      customer.phone,
      40
    );

    const address = cleanText(
      customer.address,
      250
    );

    const city = cleanText(
      customer.city,
      120
    );

    const deliveryNotes = cleanText(
      customer.deliveryNotes,
      500
    );

    if (!fullName) {
      throw new Error(
        "Enter the customer's full name."
      );
    }

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      throw new Error(
        "Enter a valid email address."
      );
    }

    if (!phone) {
      throw new Error(
        "Enter a phone number."
      );
    }

    if (!address || !city) {
      throw new Error(
        "Enter the delivery address and city or region."
      );
    }

    if (
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      throw new Error(
        "The shopping bag is empty."
      );
    }

    if (cart.length > 30) {
      throw new Error(
        "The shopping bag contains too many separate items."
      );
    }

    /*
     * Critical security step:
     * prices are read from the trusted server-side catalogue,
     * never from values submitted by the browser.
     */
    const orderItems =
      buildOrderItems(cart);

    const subtotalGhs =
      orderItems.reduce(
        (sum, item) =>
          sum + item.lineTotal,
        0
      );

    const amountInPesewas =
      Math.round(subtotalGhs * 100);

    if (
      !Number.isSafeInteger(
        amountInPesewas
      ) ||
      amountInPesewas <= 0
    ) {
      throw new Error(
        "The order total is invalid."
      );
    }

    const reference =
      `HCH-${Date.now()}-` +
      randomBytes(4)
        .toString("hex")
        .toUpperCase();

    const siteUrl =
      getSiteUrl(request);

    const callbackUrl =
      `${siteUrl}/payment/callback`;

    const metadata = {
      orderReference: reference,
      expectedAmountPesewas:
        amountInPesewas,
      delivery:
        "Delivery fee is arranged separately after payment.",
      customer: {
        fullName,
        phone,
        address,
        city,
        deliveryNotes,
      },
      items: orderItems,
      custom_fields: [
        {
          display_name: "Customer name",
          variable_name: "customer_name",
          value: fullName,
        },
        {
          display_name: "Phone number",
          variable_name: "phone_number",
          value: phone,
        },
        {
          display_name: "Delivery location",
          variable_name:
            "delivery_location",
          value: `${address}, ${city}`,
        },
      ],
    };

    const paystackResponse =
      await fetch(
        PAYSTACK_INITIALIZE_URL,
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${secretKey}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            amount: String(
              amountInPesewas
            ),
            currency: "GHS",
            reference,
            callback_url: callbackUrl,
            metadata:
              JSON.stringify(metadata),
          }),
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
        ?.authorization_url
    ) {
      console.error(
        "Paystack initialization failed:",
        paystackPayload
      );

      return sendJson(response, 502, {
        message:
          paystackPayload?.message ||
          "Could not start the payment.",
      });
    }

    return sendJson(response, 200, {
      authorizationUrl:
        paystackPayload.data
          .authorization_url,
      reference:
        paystackPayload.data.reference ||
        reference,
    });
  } catch (error) {
    console.error(
      "Checkout initialization error:",
      error
    );

    return sendJson(response, 400, {
      message:
        error instanceof Error
          ? error.message
          : "Could not start the payment.",
    });
  }
}
