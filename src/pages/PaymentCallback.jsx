import {
  Check,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER =
  import.meta.env
    .VITE_WHATSAPP_NUMBER ||
  "233597082755";

function formatCurrency(value) {
  return `GH₵${Number(
    value || 0
  ).toLocaleString("en-GH")}`;
}

function PaymentCallback() {
  const [searchParams] =
    useSearchParams();

  const { clearCart } = useCart();

  const hasVerified =
    useRef(false);

  const reference =
    searchParams.get("reference") ||
    searchParams.get("trxref") ||
    "";

  const [state, setState] =
    useState({
      status: "loading",
      result: null,
      message:
        "Confirming your payment securely.",
    });

  useEffect(() => {
    if (hasVerified.current) {
      return undefined;
    }

    hasVerified.current = true;

    if (!reference) {
      setState({
        status: "error",
        result: null,
        message:
          "No transaction reference was returned.",
      });

      return undefined;
    }

    const controller =
      new AbortController();

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(
            reference
          )}`,
          {
            method: "GET",
            cache: "no-store",
            signal:
              controller.signal,
          }
        );

        const data =
          await response
            .json()
            .catch(() => ({}));

        if (
          !response.ok ||
          !data.verified
        ) {
          setState({
            status: "error",
            result: data,
            message:
              data.message ||
              "The payment could not be confirmed.",
          });

          return;
        }

        clearCart();

        setState({
          status: "success",
          result: data,
          message:
            "Your payment has been confirmed.",
        });
      } catch (error) {
        if (
          error?.name ===
          "AbortError"
        ) {
          return;
        }

        setState({
          status: "error",
          result: null,
          message:
            "We could not contact the payment verification service.",
        });
      }
    }

    verifyPayment();

    return () =>
      controller.abort();
  }, [clearCart, reference]);

  const whatsappUrl =
    useMemo(() => {
      if (
        state.status !==
          "success" ||
        !state.result
      ) {
        return "";
      }

      const {
        result,
      } = state;

      const itemLines =
        result.items?.map(
          (item) =>
            `- ${item.name} (${item.colorName} — ${item.colorCode}) x${item.quantity}`
        ) || [];

      const customer =
        result.customer || {};

      const message = [
        "Hello Hairachy, I have completed payment for my order.",
        "",
        `Reference: ${result.reference}`,
        `Amount paid: ${formatCurrency(
          result.amountGhs
        )}`,
        "",
        "Items:",
        ...itemLines,
        "",
        `Name: ${
          customer.fullName || ""
        }`,
        `Phone: ${
          customer.phone || ""
        }`,
        `Delivery location: ${
          customer.address || ""
        }, ${customer.city || ""}`,
        customer.deliveryNotes
          ? `Delivery notes: ${customer.deliveryNotes}`
          : "",
        "",
        "Please help me arrange delivery.",
      ]
        .filter(Boolean)
        .join("\n");

      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;
    }, [state]);

  if (
    state.status === "loading"
  ) {
    return (
      <PaymentStateShell>
        <LoaderCircle
          size={34}
          strokeWidth={1.4}
          className="animate-spin"
        />

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-black/45">
          Payment verification
        </p>

        <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-brand-black">
          Confirming payment.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-brand-black/55">
          Keep this page open while
          Hairachy confirms the
          transaction with Paystack.
        </p>
      </PaymentStateShell>
    );
  }

  if (
    state.status === "error"
  ) {
    return (
      <PaymentStateShell>
        <ShieldAlert
          size={34}
          strokeWidth={1.4}
        />

        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-black/45">
          Payment not confirmed
        </p>

        <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-brand-black">
          Do not pay again yet.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-brand-black/55">
          {state.message} Check your
          Paystack result or retry
          verification.
        </p>

        {reference && (
          <p className="mt-5 text-xs text-brand-black/45">
            Reference: {reference}
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
          className="mt-9 inline-flex h-14 items-center justify-center gap-3 bg-brand-black px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#3a2a24]"
        >
          <RotateCcw
            size={15}
            strokeWidth={1.5}
          />

          Check again
        </button>

        <div className="mt-5">
          <Link
            to="/contact"
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-black/55 underline underline-offset-4"
          >
            Contact Hairachy
          </Link>
        </div>
      </PaymentStateShell>
    );
  }

  const result = state.result;

  return (
    <main className="min-h-screen bg-brand-ivory px-6 py-16 text-brand-black md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex h-16 w-16 items-center justify-center bg-brand-black text-white">
          <Check
            size={27}
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-black/45">
          Payment confirmed
        </p>

        <h1 className="mt-5 max-w-2xl font-serif text-5xl font-medium leading-[0.95] md:text-7xl">
          Thank you for your order.
        </h1>

        <p className="mt-7 max-w-xl text-sm leading-7 text-brand-black/60">
          Hairachy has confirmed your
          product payment. Delivery is
          not included and will be
          arranged separately.
        </p>

        <div className="mt-12 border-y border-brand-black/15 py-8">
          <DetailRow
            label="Reference"
            value={result.reference}
          />

          <DetailRow
            label="Amount paid"
            value={formatCurrency(
              result.amountGhs
            )}
          />

          <DetailRow
            label="Payment status"
            value="Confirmed"
          />
        </div>

        {result.items?.length > 0 && (
          <div className="mt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-black/45">
              Order items
            </p>

            <div className="mt-5 border-t border-brand-black/15">
              {result.items.map(
                (item) => (
                  <div
                    key={`${item.id}-${item.colorCode}`}
                    className="flex items-start justify-between gap-6 border-b border-brand-black/15 py-5"
                  >
                    <div>
                      <p className="font-serif text-xl font-medium">
                        {item.name}
                      </p>

                      <p className="mt-2 text-xs text-brand-black/50">
                        {item.colorName} —{" "}
                        {item.colorCode} ·
                        Quantity{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      {formatCurrency(
                        item.lineTotal
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 flex h-14 w-full items-center justify-center gap-3 bg-brand-black px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#3a2a24] sm:w-fit"
        >
          <MessageCircle
            size={17}
            strokeWidth={1.5}
          />

          Arrange delivery
        </a>

        <Link
          to="/shop"
          className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-black/55 underline underline-offset-4"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

function PaymentStateShell({
  children,
}) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-brand-ivory px-6 py-16 text-center text-brand-black">
      <div className="max-w-xl">
        {children}
      </div>
    </main>
  );
}

function DetailRow({
  label,
  value,
}) {
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-black/45">
        {label}
      </span>

      <span className="break-all text-sm font-medium">
        {value}
      </span>
    </div>
  );
}

export default PaymentCallback;
