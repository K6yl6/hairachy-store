import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";

const initialCustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  deliveryNotes: "",
};

function formatCurrency(value) {
  return `GH₵${Number(value || 0).toLocaleString("en-GH")}`;
}

function Checkout() {
  const { cart, total } = useCart();

  const [customer, setCustomer] = useState(
    initialCustomerDetails
  );

  const [paymentMethod, setPaymentMethod] = useState(
    "paystack"
  );

  /*
   * No delivery charge is being assumed.
   * Replace this with the real delivery quotation or calculation later.
   */
  const deliveryFee = null;

  const subtotal = Number(total || 0);

  const hasDeliveryFee = Number.isFinite(deliveryFee);

  const orderTotal = hasDeliveryFee
    ? subtotal + deliveryFee
    : subtotal;

  function updateCustomerField(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  function handleCheckout(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (cart.length === 0) {
      toast.error("Your bag is empty.");
      return;
    }

    /*
     * PAYSTACK INTEGRATION POINT
     *
     * The following dynamic information will be sent to Paystack:
     *
     * customer.fullName
     * customer.email
     * customer.phone
     * customer.address
     * cart
     * subtotal
     * deliveryFee
     * orderTotal
     * paymentMethod
     *
     * Do not generate transaction references in the browser when
     * a backend is added. The backend should create and verify
     * the transaction.
     */

    toast.info("Paystack is not connected yet.", {
      description:
        "Your details were validated, but no order or payment was submitted.",
    });
  }

  if (cart.length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-black">
      {/* Checkout heading */}
      <section className="border-b border-brand-black/10">
        <div className="mx-auto max-w-[1500px] px-6 py-14 md:px-10 md:py-20">
          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-brand-black/55
              transition-colors
              hover:text-brand-black
            "
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.6}
            />

            Continue shopping
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-brand-black/50
                "
              >
                Secure order
              </p>

              <h1
                className="
                  mt-5
                  font-serif
                  text-5xl
                  font-medium
                  leading-[0.95]
                  tracking-tight
                  md:text-7xl
                "
              >
                Checkout.
              </h1>
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-brand-black/55
                md:justify-self-end
              "
            >
              Review your selected textures and enter your
              delivery information before continuing to payment.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleCheckout}>
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]
          "
        >
          {/* Customer and delivery information */}
          <div
            className="
              border-brand-black/10
              px-6
              py-14
              md:px-10
              md:py-20
              lg:border-r
              lg:px-16
            "
          >
            <CheckoutSection
              number="01"
              title="Customer information"
              description="Enter the details Hairachy should use to contact you about this order."
            >
              <div className="grid gap-x-8 gap-y-9 md:grid-cols-2">
                <CheckoutField
                  icon={UserRound}
                  label="Full name"
                  name="fullName"
                  value={customer.fullName}
                  onChange={updateCustomerField}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />

                <CheckoutField
                  icon={Mail}
                  label="Email address"
                  name="email"
                  type="email"
                  value={customer.email}
                  onChange={updateCustomerField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

                <CheckoutField
                  icon={Phone}
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={updateCustomerField}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  required
                />
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="02"
              title="Delivery information"
              description="Provide the location where your order should be delivered."
              className="mt-16"
            >
              <div className="grid gap-x-8 gap-y-9 md:grid-cols-2">
                <div className="md:col-span-2">
                  <CheckoutField
                    icon={MapPin}
                    label="Delivery address"
                    name="address"
                    value={customer.address}
                    onChange={updateCustomerField}
                    placeholder="Street, area, landmark or digital address"
                    autoComplete="street-address"
                    required
                  />
                </div>

                <CheckoutField
                  label="City or region"
                  name="city"
                  value={customer.city}
                  onChange={updateCustomerField}
                  placeholder="Enter your city or region"
                  autoComplete="address-level1"
                  required
                />

                <div className="md:col-span-2">
                  <label
                    htmlFor="deliveryNotes"
                    className="
                      block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-brand-black
                    "
                  >
                    Delivery notes

                    <span
                      className="
                        ml-2
                        font-normal
                        normal-case
                        tracking-normal
                        text-brand-black/40
                      "
                    >
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    value={customer.deliveryNotes}
                    onChange={updateCustomerField}
                    rows={4}
                    placeholder="Add directions or other delivery information"
                    className="
                      mt-3
                      w-full
                      resize-none
                      border-0
                      border-b
                      border-brand-black/25
                      bg-transparent
                      px-0
                      py-4
                      text-[15px]
                      leading-7
                      text-brand-black
                      outline-none
                      transition-colors
                      placeholder:text-brand-black/35
                      focus:border-brand-black
                    "
                  />
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection
              number="03"
              title="Payment method"
              description="Payment will be completed through Paystack after the integration is connected."
              className="mt-16"
            >
              <label
                className="
                  relative
                  flex
                  cursor-pointer
                  items-center
                  gap-5
                  border
                  border-brand-black
                  bg-transparent
                  p-5
                  transition-colors
                  hover:bg-brand-black/[0.03]
                "
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paystack"
                  checked={paymentMethod === "paystack"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  className="sr-only"
                />

                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-brand-black
                  "
                >
                  <span
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-brand-black
                    "
                  />
                </span>

                <CreditCard
                  size={22}
                  strokeWidth={1.5}
                  className="shrink-0"
                />

                <span className="flex-1">
                  <span
                    className="
                      block
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                    "
                  >
                    Paystack checkout
                  </span>

                  <span
                    className="
                      mt-2
                      block
                      text-xs
                      leading-5
                      text-brand-black/55
                    "
                  >
                    Available payment options will be presented
                    inside the Paystack checkout.
                  </span>
                </span>
              </label>

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  text-xs
                  leading-5
                  text-brand-black/50
                "
              >
                <LockKeyhole
                  size={15}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  Payment credentials will not be collected by
                  this form. They will be entered during the
                  Paystack payment step.
                </p>
              </div>
            </CheckoutSection>
          </div>

          {/* Order summary */}
          <aside
            className="
              bg-[#30231e]
              px-6
              py-14
              text-white
              md:px-10
              md:py-20
              lg:px-12
            "
          >
            <div className="lg:sticky lg:top-28">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.28em]
                      text-white/45
                    "
                  >
                    Order summary
                  </p>

                  <h2
                    className="
                      mt-4
                      font-serif
                      text-4xl
                      font-medium
                    "
                  >
                    Your bag.
                  </h2>
                </div>

                <p className="text-xs text-white/50">
                  {cart.reduce(
                    (sum, item) =>
                      sum + Number(item.quantity || 0),
                    0
                  )}{" "}
                  items
                </p>
              </div>

              {/* Product items */}
              <div className="mt-10 border-t border-white/15">
                {cart.map((item) => {
                  const quantity = Number(item.quantity || 1);
                  const itemTotal =
                    Number(item.price || 0) * quantity;

                  const itemKey =
                    item.cartKey ||
                    `${item.id}-${item.length || "default"}`;

                  return (
                    <article
                      key={itemKey}
                      className="
                        grid
                        grid-cols-[82px_minmax(0,1fr)]
                        gap-4
                        border-b
                        border-white/15
                        py-6
                      "
                    >
                      <div
                        className="
                          aspect-[4/5]
                          overflow-hidden
                          bg-white/10
                        "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      </div>

                      <div className="min-w-0">
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >
                          <div>
                            {item.category && (
                              <p
                                className="
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.22em]
                                  text-white/40
                                "
                              >
                                {item.category}
                              </p>
                            )}

                            <h3
                              className="
                                mt-2
                                font-serif
                                text-xl
                                font-medium
                                leading-tight
                              "
                            >
                              {item.name}
                            </h3>
                          </div>

                          <p
                            className="
                              shrink-0
                              text-sm
                              font-semibold
                            "
                          >
                            {formatCurrency(itemTotal)}
                          </p>
                        </div>

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            gap-x-4
                            gap-y-1
                            text-xs
                            text-white/50
                          "
                        >
                          {item.length && (
                            <span>
                              Length: {item.length}&quot;
                            </span>
                          )}

                          <span>
                            Quantity: {quantity}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Price breakdown */}
              <div className="mt-8 space-y-5">
                <SummaryRow
                  label="Subtotal"
                  value={formatCurrency(subtotal)}
                />

                <SummaryRow
                  label="Delivery"
                  value={
                    hasDeliveryFee
                      ? formatCurrency(deliveryFee)
                      : "To be confirmed"
                  }
                  muted={!hasDeliveryFee}
                />
              </div>

              <div
                className="
                  mt-8
                  flex
                  items-end
                  justify-between
                  border-t
                  border-white/20
                  pt-7
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                    "
                  >
                    Total
                  </p>

                  {!hasDeliveryFee && (
                    <p className="mt-2 text-[10px] text-white/40">
                      Before delivery charges
                    </p>
                  )}
                </div>

                <p
                  className="
                    font-serif
                    text-3xl
                    font-medium
                  "
                >
                  {formatCurrency(orderTotal)}
                </p>
              </div>

              <button
                type="submit"
                className="
                  mt-9
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  bg-white
                  px-6
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-brand-black
                  transition-colors
                  hover:bg-[#d8cec4]
                "
              >
                Continue to payment

                <ArrowRight
                  size={16}
                  strokeWidth={1.6}
                />
              </button>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-white/40
                "
              >
                <LockKeyhole
                  size={13}
                  strokeWidth={1.5}
                />

                No payment is taken until Paystack opens
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}

function CheckoutSection({
  number,
  title,
  description,
  className = "",
  children,
}) {
  return (
    <section className={className}>
      <div
        className="
          flex
          items-start
          gap-5
          border-b
          border-brand-black/15
          pb-7
        "
      >
        <span
          className="
            mt-1
            text-[10px]
            font-semibold
            tracking-[0.2em]
            text-brand-black/40
          "
        >
          {number}
        </span>

        <div>
          <h2
            className="
              font-serif
              text-3xl
              font-medium
              text-brand-black
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-brand-black/55
            "
          >
            {description}
          </p>
        </div>
      </div>

      <div className="mt-9">
        {children}
      </div>
    </section>
  );
}

function CheckoutField({
  icon: Icon,
  label,
  type = "text",
  ...inputProps
}) {
  return (
    <div>
      <label
        htmlFor={inputProps.name}
        className="
          block
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-brand-black
        "
      >
        {label}
      </label>

      <div className="relative mt-3">
        {Icon && (
          <Icon
            size={17}
            strokeWidth={1.5}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              text-brand-black/45
            "
          />
        )}

        <input
          id={inputProps.name}
          type={type}
          {...inputProps}
          className={`
            w-full
            border-0
            border-b
            border-brand-black/25
            bg-transparent
            py-4
            pr-2
            text-[15px]
            text-brand-black
            outline-none
            transition-colors
            placeholder:text-brand-black/35
            focus:border-brand-black
            ${Icon ? "pl-7" : "pl-0"}
          `}
        />
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-sm text-white/55">
        {label}
      </span>

      <span
        className={`
          text-sm
          ${
            muted
              ? "text-white/45"
              : "font-medium text-white"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyCheckout() {
  return (
    <main
      className="
        flex
        min-h-[75vh]
        items-center
        justify-center
        bg-brand-ivory
        px-6
        text-center
      "
    >
      <div className="max-w-lg">
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-brand-black/45
          "
        >
          Checkout
        </p>

        <h1
          className="
            mt-5
            font-serif
            text-5xl
            font-medium
            text-brand-black
          "
        >
          Your bag is empty.
        </h1>

        <p
          className="
            mx-auto
            mt-5
            max-w-sm
            text-sm
            leading-6
            text-brand-black/55
          "
        >
          Add a Hairachy texture to your bag before continuing
          to checkout.
        </p>

        <Link
          to="/shop"
          className="
            mt-9
            inline-flex
            h-14
            items-center
            justify-center
            gap-3
            bg-brand-black
            px-8
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-white
            transition-colors
            hover:bg-[#3a2a24]
          "
        >
          Explore the collection

          <ArrowRight
            size={16}
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </main>
  );
}

export default Checkout;