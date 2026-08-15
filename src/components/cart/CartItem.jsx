import {
  Minus,
  Plus,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

function formatCurrency(value) {
  return `GH₵${Number(
    value || 0
  ).toLocaleString("en-GH")}`;
}

function getColorLabel(item) {
  if (!item.color) {
    return "";
  }

  if (typeof item.color === "string") {
    return item.color;
  }

  if (item.color.label) {
    return item.color.label;
  }

  if (
    item.color.name &&
    item.color.code
  ) {
    return `${item.color.name} — ${item.color.code}`;
  }

  return (
    item.color.name ||
    item.color.code ||
    ""
  );
}

function CartItem({ item }) {
  const {
    removeFromCart,
    updateQuantity,
  } = useCart();

  const quantity = Math.max(
    1,
    Number(item.quantity) || 1
  );

  const unitPrice =
    Number(item.price) || 0;

  const lineTotal =
    unitPrice * quantity;

  const colorLabel =
    getColorLabel(item);

  return (
    <article
      className="
        grid
        grid-cols-[76px_minmax(0,1fr)]
        gap-3
        border-b
        border-brand-black/10
        py-6
        sm:grid-cols-[96px_minmax(0,1fr)]
        sm:gap-5
      "
    >
      {/* Product image */}
      <div
        className="
          aspect-[4/5]
          self-start
          overflow-hidden
          bg-[#ddd2c8]
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

      {/* Product information */}
      <div className="min-w-0">
        <div
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-start
            sm:justify-between
            sm:gap-4
          "
        >
          <div className="min-w-0">
            {item.category && (
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-brand-black/45
                  sm:tracking-[0.24em]
                "
              >
                {item.category}
              </p>
            )}

            <h3
              className="
                mt-2
                break-words
                font-serif
                text-lg
                font-medium
                leading-tight
                text-brand-black
                sm:text-xl
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
              text-brand-black
            "
          >
            {formatCurrency(lineTotal)}
          </p>
        </div>

        {/* Selected product options */}
        <div
          className="
            mt-3
            flex
            flex-col
            gap-1
            text-[11px]
            leading-5
            text-brand-black/55
            sm:text-xs
          "
        >
          {colorLabel && (
            <span>
              Color: {colorLabel}
            </span>
          )}

          {item.length && (
            <span>
              Length: {item.length}&quot;
            </span>
          )}

          <span>
            {formatCurrency(unitPrice)} each
          </span>
        </div>

        {/* Quantity and remove */}
        <div
          className="
            mt-5
            flex
            flex-col
            items-start
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-4
          "
        >
          <div
            className="
              flex
              h-10
              shrink-0
              items-center
              border
              border-brand-black/20
            "
          >
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.cartKey,
                  -1
                )
              }
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="
                flex
                h-full
                w-9
                items-center
                justify-center
                text-brand-black
                transition-colors
                hover:bg-brand-black
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
                disabled:hover:bg-transparent
                disabled:hover:text-brand-black
                sm:w-10
              "
            >
              <Minus
                size={14}
                strokeWidth={1.6}
              />
            </button>

            <span
              className="
                flex
                h-full
                min-w-8
                items-center
                justify-center
                border-x
                border-brand-black/20
                px-2
                text-xs
                font-semibold
                text-brand-black
                sm:min-w-9
              "
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.cartKey,
                  1
                )
              }
              aria-label={`Increase quantity of ${item.name}`}
              className="
                flex
                h-full
                w-9
                items-center
                justify-center
                text-brand-black
                transition-colors
                hover:bg-brand-black
                hover:text-white
                sm:w-10
              "
            >
              <Plus
                size={14}
                strokeWidth={1.6}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              removeFromCart(
                item.cartKey
              )
            }
            className="
              shrink-0
              whitespace-normal
              break-words
              border-b
              border-brand-black/30
              pb-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-brand-black/55
              transition-colors
              hover:border-brand-black
              hover:text-brand-black
              sm:tracking-[0.18em]
            "
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;