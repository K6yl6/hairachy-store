import { Search, X } from "lucide-react";

function ProductSearch({ search, setSearch }) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        strokeWidth={1.5}
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          text-brand-muted
        "
      />

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search textures, curls or locks"
        aria-label="Search products"
        className="
          w-full
          border-0
          border-b
          border-brand-black/25
          bg-transparent
          py-4
          pl-8
          pr-10
          text-sm
          text-brand-black
          outline-none
          transition-colors
          placeholder:text-brand-muted
          focus:border-brand-black
        "
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            text-brand-muted
            transition
            hover:text-brand-black
          "
        >
          <X size={17} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

export default ProductSearch;