const collections = [
  {
    name: "Deep Wave & Boho",
    description: "Soft waves with natural movement and volume.",
  },
  {
    name: "Natural Texture",
    description: "Rich curls and textures that embrace your beauty.",
  },
  {
    name: "Sleek & Straight",
    description: "Smooth, polished styles with a flawless finish.",
  },
  {
    name: "Protective Styles",
    description: "Elegant locks and trendy protective looks.",
  },
];


function CollectionSection() {

  return (
    <section className="bg-white py-20">

      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">
            Our Collections
          </p>


          <h2 className="mt-4 text-4xl font-bold text-brand-black md:text-5xl">
            Explore Your Perfect Style
          </h2>


          <p className="mt-5 text-brand-muted">
            Discover premium hair extensions designed
            to complement every look and occasion.
          </p>

        </div>


        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {collections.map((collection) => (

            <div
              key={collection.name}
              className="
                group
                rounded-2xl
                border
                border-neutral-200
                bg-brand-ivory
                p-8
                transition
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <h3 className="text-xl font-semibold text-brand-black">
                {collection.name}
              </h3>


              <p className="mt-3 text-sm text-brand-muted">
                {collection.description}
              </p>


              <button className="mt-6 text-sm font-medium text-brand-gold transition group-hover:text-brand-gold-dark">
                Explore Collection →
              </button>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}


export default CollectionSection;