import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function ProductCard({ product, featured = false }) {
  const formattedPrice = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="group"
    >
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="block"
      >
        {/* Full-bleed product image */}
        <div
          className={`
            relative
            overflow-hidden
            bg-[#ded2c6]
            ${
              featured
                ? "aspect-[4/5] lg:aspect-[16/10]"
                : "aspect-[4/5]"
            }
          `}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.035]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />
        </div>

        {/* Editorial product information */}
        <div className="pt-5">
          <div className="flex items-start justify-between gap-5">
            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-brand-gold
              "
            >
              {product.label}
            </p>

            <p className="shrink-0 text-sm font-medium text-brand-black">
              {formattedPrice}
            </p>
          </div>

          <h3
            className={`
              mt-3
              font-serif
              font-medium
              leading-none
              text-brand-black
              ${
                featured
                  ? "text-4xl lg:text-5xl"
                  : "text-3xl"
              }
            `}
          >
            {product.name}
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-6 text-brand-muted">
            {product.description}
          </p>

          <div
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              border-b
              border-brand-black/30
              pb-1
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-brand-black
              transition-all
              duration-300
              group-hover:border-brand-gold
              group-hover:text-brand-gold
            "
          >
            View product

            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProductCard;