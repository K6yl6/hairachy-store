import { useMemo, useState } from "react";

import products from "@/data/products";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import ProductFilters from "./ProductFilters";

function ProductGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category)),
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const searchableContent = [
        product.name,
        product.category,
        product.label,
        product.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        query === "" || searchableContent.includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
  }

  return (
    <div>
      {/* Search and filtering */}
      <div className="border-y border-brand-black/10 py-7">
        <div
          className="
            grid
            gap-8
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-brand-gold
              "
            >
              Browse by texture
            </p>

            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <ProductSearch
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>

      {/* Result information */}
      <div className="mt-10 flex items-center justify-between gap-5">
        <p className="text-sm text-brand-muted">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "style" : "styles"}
        </p>

        {(search || activeCategory !== "All") && (
          <button
            type="button"
            onClick={resetFilters}
            className="
              border-b
              border-brand-black/30
              pb-1
              text-xs
              uppercase
              tracking-[0.18em]
              text-brand-black
              transition
              hover:border-brand-gold
              hover:text-brand-gold
            "
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Editorial product grid */}
      {filteredProducts.length > 0 ? (
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-y-20
            md:grid-cols-2
            md:gap-x-8
            lg:grid-cols-3
            lg:gap-x-10
            lg:gap-y-24
          "
        >
          {filteredProducts.map((product, index) => {
            const featured = index === 0;

            return (
              <div
                key={product.id}
                className={featured ? "lg:col-span-2" : ""}
              >
                <ProductCard
                  product={product}
                  featured={featured}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="
            mt-16
            border-y
            border-brand-black/10
            py-24
            text-center
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-brand-gold
            "
          >
            No matching styles
          </p>

          <h2
            className="
              mt-4
              font-serif
              text-4xl
              font-medium
              text-brand-black
            "
          >
            Try another texture
          </h2>

          <p className="mx-auto mt-4 max-w-md text-brand-muted">
            Adjust your search or browse the complete Hairachy
            collection.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="
              mt-8
              bg-brand-black
              px-8
              py-4
              text-xs
              uppercase
              tracking-[0.22em]
              text-white
              transition
              hover:bg-brand-gold
              hover:text-brand-black
            "
          >
            View all styles
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;