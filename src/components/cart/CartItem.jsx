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

  return (
    <article
      className="
        grid
        grid-cols-[96px_minmax(0,1fr)]
        gap-5
        border-b
        border-brand-black/10
        py-6
      "
    >
      <div
        className="
          aspect-[4/5]
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

      <div className="min-w-0">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            {item.category && (
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-brand-black/45
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
                text-brand-black
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

        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-x-4
            gap-y-1
            text-xs
            text-brand-black/55
          "
        >
          {item.length && (
            <span>
              Length: {item.length}&quot;
            </span>
          )}

          <span>
            {formatCurrency(unitPrice)} each
          </span>
        </div>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              h-10
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
                w-10
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
                min-w-9
                items-center
                justify-center
                border-x
                border-brand-black/20
                px-2
                text-xs
                font-semibold
                text-brand-black
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
                w-10
                items-center
                justify-center
                text-brand-black
                transition-colors
                hover:bg-brand-black
                hover:text-white
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
              removeFromCart(item.cartKey)
            }
            className="
              border-b
              border-brand-black/30
              pb-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-brand-black/55
              transition-colors
              hover:border-brand-black
              hover:text-brand-black
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