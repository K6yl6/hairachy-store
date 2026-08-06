import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import products from "@/data/products";

const featuredProductIds = [
  "spiral",
  "bone-straight",
  "soft-butterfly-locs",
];

function formatCurrency(value) {
  return `GH₵${Number(value || 0).toLocaleString("en-GH")}`;
}

function Collections() {
  const featuredProducts = featuredProductIds
    .map((productId) =>
      products.find((product) => product.id === productId)
    )
    .filter(Boolean);

  return (
    <section className="bg-brand-ivory px-5 py-20 text-brand-black md:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1480px]">
        {/* Section heading */}
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-black/50">
            Featured collection
          </p>

          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Find your next look.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-black/65 md:text-lg">
            Explore curls, straight styles and loc extensions from the
            Hairachy collection.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative block overflow-hidden bg-white"
            >
              <article className="relative min-h-[620px] overflow-hidden md:min-h-[680px]">
                {/* Product image */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:p-8"
                />

                {/* Gradient for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Product information */}
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d6b35a]">
                        {product.category}
                      </p>

                      <h3 className="mt-5 font-serif text-4xl font-medium leading-[0.95] md:text-5xl">
                        {product.name}
                      </h3>

                      <p className="mt-5 text-sm font-semibold">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
                    <span>View product</span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Shop link */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border-b border-brand-black pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-55"
          >
            Shop all products
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Collections;