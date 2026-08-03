function ProductFilters({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="-mx-2 overflow-x-auto">
      <div className="flex min-w-max items-center gap-8 px-2">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`
                border-b
                pb-2
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                transition-colors
                ${
                  active
                    ? "border-brand-black text-brand-black"
                    : "border-transparent text-brand-muted hover:text-brand-black"
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilters;