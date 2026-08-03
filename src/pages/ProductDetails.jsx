import { useEffect, useMemo, useState } from "react";
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

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const gallery = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.filter(Boolean);
    }

    return product.image ? [product.image] : [];
  }, [product]);

  const [activeImage, setActiveImage] = useState("");
  const [selectedLength, setSelectedLength] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;

    setActiveImage(gallery[0] || product.image);
    setSelectedLength(product.lengths?.[0] ?? null);
    setQuantity(1);
  }, [product, gallery]);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-brand-ivory px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">
            Product unavailable
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-brand-black">
            Product not found.
          </h1>

          <Link
            to="/shop"
            className="
              mt-8
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

  const formattedPrice = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(product.price);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function handleAddToCart() {
    addToCart({
      ...product,
      length: selectedLength,
      quantity,
    });

    toast.success("Added to your bag", {
      description: `${product.name}${
        selectedLength ? ` · ${selectedLength}"` : ""
      }`,
    });
  }

  return (
    <main className="min-h-screen bg-brand-ivory">
      <section className="border-b border-brand-black/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)]">
            {/* Editorial gallery */}
            <div className="bg-[#d8cec4]">
              <div
                className={`
                  grid
                  ${
                    gallery.length > 1
                      ? "lg:grid-cols-[96px_minmax(0,1fr)]"
                      : ""
                  }
                `}
              >
                {/* Desktop thumbnails */}
                {gallery.length > 1 && (
                  <div
                    className="
                      order-2
                      flex
                      gap-3
                      overflow-x-auto
                      border-t
                      border-black/10
                      bg-brand-ivory
                      p-4
                      lg:order-1
                      lg:flex-col
                      lg:border-r
                      lg:border-t-0
                      lg:p-3
                    "
                  >
                    {gallery.map((image, index) => {
                      const selected = activeImage === image;

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(image)}
                          aria-label={`View product image ${index + 1}`}
                          className={`
                            relative
                            h-24
                            w-20
                            shrink-0
                            overflow-hidden
                            border
                            transition-colors
                            lg:h-28
                            lg:w-full
                            ${
                              selected
                                ? "border-brand-black"
                                : "border-transparent hover:border-brand-black/40"
                            }
                          `}
                        >
                          <img
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Main image */}
                <div
                  className="
                    order-1
                    relative
                    aspect-[4/5]
                    min-h-[520px]
                    overflow-hidden
                    lg:order-2
                    lg:aspect-auto
                    lg:min-h-[820px]
                  "
                >
                  <img
                    key={activeImage}
                    src={activeImage || product.image}
                    alt={product.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-opacity
                      duration-500
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/10
                      via-transparent
                      to-transparent
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
                      backdrop-blur-sm
                      transition
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
              </div>
            </div>

            {/* Product information */}
            <div className="px-6 py-12 md:px-10 lg:px-14 lg:py-20">
              <div className="lg:sticky lg:top-28">
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.32em]
                    text-brand-black/65
                  "
                >
                  {product.label || product.category}
                </p>

                <h1
                  className="
                    mt-6
                    max-w-xl
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
                    tracking-tight
                    text-brand-black
                  "
                >
                  {formattedPrice}
                </p>

                {/* Length */}
                {product.lengths?.length > 0 && (
                  <div className="mt-10 border-t border-brand-black/15 pt-7">
                    <div className="flex items-center justify-between">
                      <h2
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.22em]
                          text-brand-black
                        "
                      >
                        Length
                      </h2>

                      <p className="text-xs text-brand-muted">
                        {selectedLength}"
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {product.lengths.map((length) => {
                        const selected = selectedLength === length;

                        return (
                          <button
                            key={length}
                            type="button"
                            onClick={() => setSelectedLength(length)}
                            aria-pressed={selected}
                            className={`
                              flex
                              h-12
                              items-center
                              justify-center
                              border
                              text-sm
                              font-semibold
                              transition-colors
                              ${
                                selected
                                  ? "border-brand-black bg-brand-black text-white"
                                  : "border-brand-black/20 bg-transparent text-brand-black hover:border-brand-black"
                              }
                            `}
                          >
                            {length}"
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="mt-9 border-t border-brand-black/15 pt-7">
                  <h2
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-brand-black
                    "
                  >
                    Details
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-lg
                      text-[15px]
                      leading-7
                      text-brand-black/75
                    "
                  >
                    {product.description}
                  </p>
                </div>

                {/* Quantity and cart */}
                <div className="mt-9 border-t border-brand-black/15 pt-7">
                  <div
                    className="
                      grid
                      grid-cols-[116px_minmax(0,1fr)]
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-14
                        items-center
                        justify-between
                        border
                        border-brand-black/25
                        px-3
                      "
                    >
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                        aria-label="Decrease quantity"
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          text-brand-black
                          transition-opacity
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        <Minus size={16} strokeWidth={1.7} />
                      </button>

                      <span className="text-sm font-semibold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        aria-label="Increase quantity"
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          text-brand-black
                        "
                      >
                        <Plus size={16} strokeWidth={1.7} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="
                        flex
                        h-14
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
                      <ShoppingBag size={17} strokeWidth={1.6} />
                      Add to cart
                    </button>
                  </div>

                  <p
                    className="
                      mt-4
                      text-center
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-brand-muted
                    "
                  >
                    Selected length: {selectedLength}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;