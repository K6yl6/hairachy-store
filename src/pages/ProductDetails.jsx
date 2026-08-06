import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";

function formatCurrency(value) {
  return `GH₵${Number(value || 0).toLocaleString("en-GH")}`;
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === id
  );

  const [selectedColorCode, setSelectedColorCode] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;

    setSelectedColorCode(
      product.colors?.[0]?.code || ""
    );

    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <main
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-brand-ivory
          px-6
          text-center
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-brand-black/45
            "
          >
            Product unavailable
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
            Product not found.
          </h1>

          <Link
            to="/shop"
            className="
              mt-9
              inline-flex
              items-center
              gap-2
              border-b
              border-brand-black
              pb-1
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-black
            "
          >
            <ArrowLeft size={15} />
            Return to shop
          </Link>
        </div>
      </main>
    );
  }

  const selectedColor =
    product.colors?.find(
      (color) => color.code === selectedColorCode
    ) || product.colors?.[0];

  const lineTotal =
    Number(product.price) * quantity;

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function handleAddToCart() {
    if (!selectedColor) {
      toast.error("Select a hair color.");
      return;
    }

    addToCart({
      ...product,

      color: {
        name: selectedColor.name,
        code: selectedColor.code,
        label: selectedColor.label,
      },

      quantity,
    });

   toast(`Added to bag — ${product.name}`);
  } 

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-black">
      <div
        className="
          mx-auto
          grid
          max-w-[1600px]
          lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]
        "
      >
        {/* Product image */}
        <section className="relative bg-white">
          <div
            className="
              relative
              aspect-[4/5]
              min-h-[560px]
              overflow-hidden
              lg:sticky
              lg:top-[88px]
              lg:h-[calc(100vh-88px)]
              lg:aspect-auto
            "
          >
            <img
              src={product.image}
              alt={product.name}
              className="
                h-full
                w-full
                object-contain
                p-6
                md:p-12
                lg:p-16
              "
            />

            <Link
              to="/shop"
              className="
                absolute
                left-5
                top-5
                inline-flex
                items-center
                gap-2
                bg-brand-ivory/90
                px-4
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-brand-black
                backdrop-blur
                transition-colors
                hover:bg-brand-black
                hover:text-white
                md:left-8
                md:top-8
              "
            >
              <ArrowLeft size={14} />
              Shop
            </Link>
          </div>
        </section>

        {/* Product information */}
        <section
          className="
            border-l
            border-brand-black/10
            px-6
            py-14
            md:px-10
            lg:px-14
            lg:py-20
          "
        >
          <div className="mx-auto max-w-xl">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-brand-black/50
              "
            >
              {product.category}
            </p>

            <h1
              className="
                mt-6
                text-5xl
                font-semibold
                uppercase
                leading-[0.92]
                tracking-[-0.045em]
                text-brand-black
                md:text-6xl
                lg:text-7xl
              "
            >
              {product.name}
            </h1>

            <p
              className="
                mt-7
                text-xl
                font-semibold
                text-brand-black
              "
            >
              {formatCurrency(product.price)}
            </p>

            <p
              className="
                mt-7
                max-w-lg
                text-[15px]
                leading-7
                text-brand-black/65
              "
            >
              {product.description}
            </p>

            {/* Color selector */}
            <div
              className="
                mt-10
                border-t
                border-brand-black/15
                pt-8
              "
            >
              <div className="flex items-center justify-between gap-5">
                <h2
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                  "
                >
                  Select color
                </h2>

                <p className="text-xs text-brand-black/50">
                  {selectedColor?.label}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {product.colors.map((color) => {
                  const selected =
                    selectedColorCode === color.code;

                  return (
                    <button
                      key={color.code}
                      type="button"
                      onClick={() =>
                        setSelectedColorCode(color.code)
                      }
                      aria-pressed={selected}
                      className={`
                        min-h-20
                        border
                        px-4
                        py-4
                        text-left
                        transition-colors
                        ${
                          selected
                            ? "border-brand-black bg-brand-black text-white"
                            : "border-brand-black/20 bg-transparent text-brand-black hover:border-brand-black"
                        }
                      `}
                    >
                      <span
                        className="
                          block
                          text-lg
                          font-semibold
                          leading-none
                        "
                      >
                        {color.code}
                      </span>

                      <span
                        className={`
                          mt-2
                          block
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-[0.16em]
                          ${
                            selected
                              ? "text-white/65"
                              : "text-brand-black/50"
                          }
                        `}
                      >
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div
              className="
                mt-10
                border-t
                border-brand-black/15
                pt-8
              "
            >
              <div className="flex items-center justify-between">
                <h2
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                  "
                >
                  Quantity
                </h2>

                <p className="text-xs text-brand-black/50">
                  {quantity} item{quantity !== 1 ? "s" : ""}
                </p>
              </div>

              <div
                className="
                  mt-5
                  flex
                  h-14
                  w-36
                  items-center
                  border
                  border-brand-black/25
                "
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="
                    flex
                    h-full
                    w-12
                    items-center
                    justify-center
                    transition-colors
                    hover:bg-brand-black
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    disabled:hover:bg-transparent
                    disabled:hover:text-brand-black
                  "
                >
                  <Minus size={16} />
                </button>

                <span
                  className="
                    flex
                    h-full
                    flex-1
                    items-center
                    justify-center
                    border-x
                    border-brand-black/20
                    text-sm
                    font-semibold
                  "
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  className="
                    flex
                    h-full
                    w-12
                    items-center
                    justify-center
                    transition-colors
                    hover:bg-brand-black
                    hover:text-white
                  "
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div
              className="
                mt-10
                border-t
                border-brand-black/15
                pt-8
              "
            >
              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  flex
                  h-16
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
                <ShoppingBag
                  size={17}
                  strokeWidth={1.6}
                />

                Add to bag — {formatCurrency(lineTotal)}
              </button>

              <div
                className="
                  mt-5
                  flex
                  justify-between
                  gap-4
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-brand-black/45
                "
              >
                <span>
                  Color: {selectedColor?.code}
                </span>

                <span>
                  Quantity: {quantity}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;