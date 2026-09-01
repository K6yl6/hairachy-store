import ProductGrid from "@/components/products/ProductGrid";

function Shop() {
  return (
    <main
      className="
        min-h-screen
        w-full
        max-w-full
        overflow-x-clip
        bg-brand-ivory
      "
    >
      {/* Editorial shop introduction */}
      <section
        className="
          w-full
          max-w-full
          overflow-hidden
          bg-[#3a2a24]
          text-brand-ivory
        "
      >
        <div
          className="
            container
            mx-auto
            grid
            w-full
            max-w-full
            min-w-0
            gap-12
            px-5
            py-20

            sm:px-6
            sm:py-24

            md:px-8
            md:py-32

            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
          "
        >
          <div className="min-w-0 max-w-full">
            <p
              className="
                max-w-full
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-brand-gold

                sm:text-xs
                sm:tracking-[0.45em]
              "
            >
              The Hairachy Edit
            </p>

            <h1
              className="
                mt-6
                w-full
                max-w-4xl
                min-w-0
                break-words
                font-serif
                text-[clamp(3rem,14vw,4.5rem)]
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

          <div
            className="
              min-w-0
              max-w-full
              border-t
              border-white/25
              pt-7
            "
          >
            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/75

                sm:text-base
              "
            >
              A considered collection of waves,
              curls, sleek textures, and protective
              styles created for movement, polish,
              and confident self-expression.
            </p>

            <p
              className="
                mt-8
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-brand-gold

                sm:text-[11px]
                sm:tracking-[0.28em]
              "
            >
              Luxury in every strand
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section
        className="
          w-full
          max-w-full
          overflow-hidden
          py-16
          md:py-24
        "
      >
        <div
          className="
            container
            mx-auto
            w-full
            max-w-full
            min-w-0
            px-5

            sm:px-6
            md:px-8
          "
        >
          <div
            className="
              mb-14
              min-w-0
              max-w-2xl
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-brand-gold

                sm:text-xs
                sm:tracking-[0.4em]
              "
            >
              Shop the collection
            </p>

            <h2
              className="
                mt-5
                max-w-full
                break-words
                font-serif
                text-[clamp(2.75rem,12vw,4rem)]
                font-medium
                leading-none
                text-brand-black

                md:text-6xl
              "
            >
              Find your texture.
            </h2>
          </div>

          <div className="min-w-0 max-w-full">
            <ProductGrid />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;