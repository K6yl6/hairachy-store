import { motion } from "framer-motion";


const features = [
  {
    number: "01",
    title: "Premium Hair Selection",
    description:
      "Carefully sourced extensions chosen for softness, natural movement, and a luxurious finish.",
    detail:
      "Quality textures • Elegant styles • Timeless beauty",
    image: "/images/why-hair-quality.jpg",
  },

  {
    number: "02",
    title: "Natural-Looking Results",
    description:
      "Designed to blend beautifully with your style while creating effortless volume and confidence.",
    detail:
      "Smooth blends • Beautiful textures • Versatile looks",
    image: "/images/why-hair-beauty.jpg",
  },

  {
    number: "03",
    title: "Personal Experience",
    description:
      "Need help finding your perfect texture or length? Our team is ready to guide you.",
    detail:
      "Expert guidance • Easy ordering • Customer care",
    image: "/images/why-hair-service.jpg",
  },
];



function WhyChooseUs() {

  return (

    <section className="bg-brand-ivory py-28">


      <div className="container mx-auto px-6">


        {/* Header */}

        <div className="max-w-3xl mb-20">


          <p
            className="
            text-sm
            uppercase
            tracking-[0.4em]
            text-brand-gold
            "
          >
            Why Hairachy
          </p>


          <h2
            className="
            mt-6
            text-5xl
            font-semibold
            leading-tight
            text-brand-black
            md:text-6xl
            "
          >
            Luxury Beyond
            <br />
            Just Hair
          </h2>


          <p
            className="
            mt-6
            max-w-xl
            text-lg
            leading-relaxed
            text-brand-muted
            "
          >
            More than extensions — a premium hair experience
            created around confidence, elegance, and individuality.
          </p>


        </div>




        {/* Editorial Features */}


        <div className="space-y-24">


          {features.map((feature, index) => (

            <motion.div

              key={feature.number}

              initial={{
                opacity:0,
                y:40
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:0.7
              }}


              className="
              grid
              items-center
              gap-10
              border-t
              border-brand-gold/20
              pt-12
              md:grid-cols-2
              "

            >



              {/* Image */}

              <div
                className={`
                ${index % 2 !== 0 ? "md:order-2" : ""}
                `}
              >

                <div
                  className="
                  aspect-[4/5]
                  overflow-hidden
                  bg-neutral-200
                  "
                >

                  <img

                    src={feature.image}

                    alt={feature.title}

                    className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-105
                    "

                  />

                </div>


              </div>




              {/* Content */}

              <div
                className={`
                ${index % 2 !== 0 ? "md:order-1" : ""}
                `}
              >


                <span
                  className="
                  text-5xl
                  font-light
                  text-brand-gold
                  "
                >
                  {feature.number}
                </span>



                <h3
                  className="
                  mt-6
                  text-3xl
                  font-semibold
                  text-brand-black
                  "
                >
                  {feature.title}
                </h3>



                <p
                  className="
                  mt-5
                  max-w-md
                  text-base
                  leading-relaxed
                  text-brand-muted
                  "
                >
                  {feature.description}
                </p>



                <p
                  className="
                  mt-6
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-brand-gold
                  "
                >
                  {feature.detail}
                </p>



              </div>



            </motion.div>


          ))}



        </div>



      </div>



    </section>

  );

}


export default WhyChooseUs;