import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat(
    "en-GH",
    {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits:
        Number.isInteger(amount)
          ? 0
          : 2,
      maximumFractionDigits: 2,
    }
  ).format(amount);
}

function ProductCard({
  product,
  featured = false,
}) {
  const onSale =
    Number(product.discountAmount) >
      0 &&
    Number(product.originalPrice) >
      Number(product.price);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
      }}
      className="
        group
        w-full
        min-w-0
        max-w-full
        overflow-hidden
      "
    >
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="
          block
          w-full
          min-w-0
          max-w-full
        "
      >
        {/* =========================
            PRODUCT IMAGE
        ========================= */}

        <div
          className={`
            relative
            w-full
            max-w-full
            overflow-hidden
            bg-white

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
              absolute
              inset-0
              block
              max-w-none
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.035]
            "
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Discount badge */}
          {onSale && (
            <div
              className="
                absolute
                left-3
                top-3
                z-10
                bg-brand-black
                px-3
                py-2
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white

                sm:left-4
                sm:top-4
                sm:text-[9px]
                sm:tracking-[0.18em]
              "
            >
              Launch — GH₵
              {product.discountAmount} off
            </div>
          )}

          {/* Hover overlay */}
          <div
            className="
              pointer-events-none
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

        {/* =========================
            PRODUCT INFO
        ========================= */}

        <div
          className="
            w-full
            min-w-0
            max-w-full
            pt-5
          "
        >
          {/* Category */}
          <p
            className="
              min-w-0
              max-w-full
              break-words
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-brand-gold

              sm:text-[11px]
              sm:tracking-[0.28em]
            "
          >
            {product.label ||
              product.category}
          </p>

          {/* =========================
              PRICE
              
              IMPORTANT:
              Visible on MOBILE too.
              No hover required.
          ========================= */}

          <div
            className="
              mt-3
              flex
              w-full
              flex-wrap
              items-center
              gap-x-2
              gap-y-2
            "
          >
            {/* Old price */}
            {onSale && (
              <span
                className="
                  text-sm
                  font-medium
                  text-brand-black/45
                  line-through
                  decoration-brand-black/55
                  decoration-1
                "
              >
                {formatCurrency(
                  product.originalPrice
                )}
              </span>
            )}

            {/* Discount price */}
            <span
              className="
                text-base
                font-bold
                text-brand-black
              "
            >
              {formatCurrency(
                product.price
              )}
            </span>

            {/* Mobile-visible saving label */}
            {onSale && (
              <span
                className="
                  inline-flex
                  items-center
                  bg-brand-black
                  px-2
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-white
                "
              >
                Save GH₵
                {product.discountAmount}
              </span>
            )}
          </div>

          {/* Product name */}
          <h3
            className={`
              mt-3
              min-w-0
              max-w-full
              break-words
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

          {/* Description */}
          <p
            className="
              mt-4
              max-w-lg
              break-words
              text-sm
              leading-6
              text-brand-muted
            "
          >
            {product.description}
          </p>

          {/* View product */}
          <div
            className="
              mt-5
              inline-flex
              max-w-full
              items-center
              gap-2
              border-b
              border-brand-black/30
              pb-1
              text-[10px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-brand-black
              transition-all
              duration-300
              group-hover:border-brand-gold
              group-hover:text-brand-gold

              sm:text-xs
              sm:tracking-[0.2em]
            "
          >
            <span>
              View product
            </span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="
                shrink-0
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