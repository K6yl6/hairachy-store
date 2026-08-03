import ProductGrid from "@/components/products/ProductGrid";

function Shop() {
  return (
    <main className="min-h-screen bg-brand-ivory">
      {/* Editorial shop introduction */}
      <section className="bg-[#3a2a24] text-brand-ivory">
        <div
          className="
            container
            mx-auto
            grid
            gap-12
            px-6
            py-24
            md:py-32
            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.45em]
                text-brand-gold
              "
            >
              The Hairachy Edit
            </p>

            <h1
              className="
                mt-6
                max-w-4xl
                font-serif
                text-6xl
                font-medium
                leading-[0.9]
                md:text-8xl
                lg:text-9xl
              "
            >
              Hair,
              <br />
              Reimagined.
            </h1>
          </div>

          <div className="border-t border-white/25 pt-7">
            <p className="max-w-md text-base leading-7 text-white/75">
              A considered collection of waves, curls, sleek textures,
              and protective styles created for movement, polish, and
              confident self-expression.
            </p>

            <p
              className="
                mt-8
                text-[11px]
                uppercase
                tracking-[0.28em]
                text-brand-gold
              "
            >
              Luxury in every strand
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 max-w-2xl">
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.4em]
                text-brand-gold
              "
            >
              Shop the collection
            </p>

            <h2
              className="
                mt-5
                font-serif
                text-5xl
                font-medium
                leading-none
                text-brand-black
                md:text-6xl
              "
            >
              Find your texture.
            </h2>
          </div>

          <ProductGrid />
        </div>
      </section>
    </main>
  );
}

export default Shop;