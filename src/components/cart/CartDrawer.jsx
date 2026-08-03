import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";
import products from "@/data/products";
import CartItem from "@/components/cart/CartItem";

function formatCurrency(value) {
  return `GH₵${Number(value || 0).toLocaleString("en-GH")}`;
}

function CartDrawer() {
  const [open, setOpen] = useState(false);

  const {
    cart,
    total,
  } = useCart();

  const itemCount = cart.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

  const suggestions = products.slice(0, 3);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      {/* Navbar bag trigger */}
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Open bag with ${itemCount} items`}
          className="
            group
            flex
            h-11
            items-center
            justify-center
            gap-2
            px-2
            text-brand-black
            transition-opacity
            hover:opacity-60
          "
        >
          {/* Visible on desktop and mobile */}
          <ShoppingBag
            size={22}
            strokeWidth={1.5}
            className="
              block
              shrink-0
              text-brand-black
            "
          />

          {/* Desktop label */}
          <span
            className="
              hidden
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.18em]
              md:inline
            "
          >
            Bag
          </span>

          {/* Visible counter on all screens */}
          <span
            className="
              text-[10px]
              font-semibold
              text-brand-black
              md:text-[11px]
            "
          >
            ({itemCount})
          </span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          flex
          h-full
          w-full
          flex-col
          gap-0
          border-l
          border-brand-black/10
          bg-brand-ivory
          p-0
          text-brand-black
          sm:max-w-[480px]
          [&>button]:right-6
          [&>button]:top-6
          [&>button]:rounded-none
          [&>button]:text-brand-black
          [&>button]:opacity-55
          [&>button]:transition-opacity
          [&>button:hover]:opacity-100
        "
      >
        <SheetHeader
          className="
            shrink-0
            border-b
            border-brand-black/10
            px-6
            py-6
            pr-16
            text-left
          "
        >
          <SheetTitle
            className="
              flex
              items-center
              gap-3
              text-left
              text-sm
              font-semibold
              uppercase
              tracking-[0.22em]
              text-brand-black
            "
          >
            Your bag

            <span
              className="
                text-[10px]
                font-medium
                tracking-normal
                text-brand-black/45
              "
            >
              {itemCount}
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <EmptyBag
            suggestions={suggestions}
            closeDrawer={() => setOpen(false)}
          />
        ) : (
          <FilledBag
            cart={cart}
            total={total}
            closeDrawer={() => setOpen(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyBag({
  suggestions,
  closeDrawer,
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {/* Empty state */}
      <div
        className="
          flex
          min-h-[430px]
          flex-col
          items-center
          justify-center
          px-7
          py-14
          text-center
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            border
            border-brand-black/20
            text-brand-black
          "
        >
          <ShoppingBag
            size={27}
            strokeWidth={1.25}
          />
        </div>

        <p
          className="
            mt-8
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-brand-black/50
          "
        >
          Nothing here yet
        </p>

        <h2
          className="
            mt-4
            font-serif
            text-4xl
            font-medium
            leading-tight
            text-brand-black
          "
        >
          Your bag is empty.
        </h2>

        <p
          className="
            mt-4
            max-w-xs
            text-sm
            leading-6
            text-brand-black/60
          "
        >
          Discover Hairachy textures created for movement,
          confidence, and effortless polish.
        </p>

        <Link
          to="/shop"
          onClick={closeDrawer}
          className="
            mt-9
            flex
            h-14
            w-full
            max-w-xs
            items-center
            justify-center
            gap-3
            bg-brand-black
            px-6
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-white
            transition-colors
            hover:bg-[#3a2a24]
          "
        >
          Start shopping

          <ArrowRight
            size={16}
            strokeWidth={1.5}
          />
        </Link>
      </div>

      {/* Suggested products */}
      {suggestions.length > 0 && (
        <div
          className="
            border-t
            border-brand-black/10
            px-6
            py-9
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-brand-black/50
            "
          >
            Explore textures
          </p>

          <div className="mt-5 border-t border-brand-black/10">
            {suggestions.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={closeDrawer}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  border-b
                  border-brand-black/10
                  py-5
                  transition-opacity
                  hover:opacity-60
                "
              >
                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-brand-black/35
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="
                    min-w-0
                    flex-1
                    font-serif
                    text-xl
                    font-medium
                    text-brand-black
                  "
                >
                  {product.name}
                </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilledBag({
  cart,
  total,
  closeDrawer,
}) {
  return (
    <>
      {/* Cart products */}
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-6
        "
      >
        {cart.map((item, index) => {
          const itemKey =
            item.cartKey ||
            `${item.id}-${item.length || "default"}-${index}`;

          return (
            <CartItem
              key={itemKey}
              item={item}
            />
          );
        })}
      </div>

      {/* Drawer checkout area */}
      <div
        className="
          shrink-0
          border-t
          border-brand-black/10
          bg-brand-ivory
          px-6
          py-6
        "
      >
        <div className="flex items-center justify-between gap-5">
          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-black
            "
          >
            Subtotal
          </span>

          <span
            className="
              text-lg
              font-semibold
              text-brand-black
            "
          >
            {formatCurrency(total)}
          </span>
        </div>

        <p
          className="
            mt-2
            text-xs
            leading-5
            text-brand-black/45
          "
        >
          Delivery details and final charges are confirmed
          during checkout.
        </p>

        <Link
          to="/checkout"
          onClick={closeDrawer}
          className="
            mt-6
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            bg-brand-black
            px-6
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-white
            transition-colors
            hover:bg-[#3a2a24]
          "
        >
          Proceed to checkout

          <ArrowRight
            size={16}
            strokeWidth={1.5}
          />
        </Link>

        <Link
          to="/shop"
          onClick={closeDrawer}
          className="
            mt-4
            flex
            justify-center
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-brand-black/55
            transition-colors
            hover:text-brand-black
          "
        >
          Continue shopping
        </Link>
      </div>
    </>
  );
}

export default CartDrawer;