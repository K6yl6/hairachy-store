import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const collections = [
  {
    name: "Deep Wave",
    image: "/products/deep-wave.jpg",
    label: "Bestseller",
  },

  {
    name: "Bone Straight",
    image: "/products/bone-straight.png",
    label: "Luxury",
  },

  {
    name: "Butterfly Locks",
    image: "/products/butterfly-locks.avif",
    label: "Protective Style",
  },
];



function Collections() {


  return (

    <section className="bg-brand-ivory py-28">


      <div className="container mx-auto px-6">


        {/* Header */}

        <div className="max-w-3xl">


          <p
            className="
            text-sm
            uppercase
            tracking-[0.45em]
            text-brand-gold
            "
          >
            Our Collections
          </p>




          <h2

            className="
            mt-5
            font-serif
            text-5xl
            font-medium
            leading-tight
            text-brand-black
            md:text-6xl
            "

          >

            Find Your Perfect Look

          </h2>




          <p

            className="
            mt-6
            max-w-xl
            text-neutral-600
            "

          >

            Explore premium hair collections crafted
            for elegance, confidence, and effortless beauty.

          </p>


        </div>







        {/* Editorial Collection Grid */}

        <div

          className="
          mt-16
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
          "

        >



          {collections.map((collection, index) => (


            <motion.div

              key={collection.name}

              initial={{
                opacity:0,
                y:30,
              }}

              whileInView={{
                opacity:1,
                y:0,
              }}

              viewport={{
                once:true,
              }}

              transition={{
                duration:0.6,
                delay:index * 0.15,
              }}

              className="
              group
              relative
              h-[560px]
              overflow-hidden
              "

            >


              <Link to="/shop">



                {/* Full Image */}

                <img

                  src={collection.image}

                  alt={collection.name}

                  loading="lazy"

                  className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                  "

                />





                {/* Editorial Gradient */}

                <div

                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/30
                  to-transparent
                  "

                />






                {/* Text */}

                <div

                  className="
                  absolute
                  bottom-0
                  left-0
                  p-10
                  text-white
                  "

                >



                  <p

                    className="
                    mb-4
                    text-xs
                    uppercase
                    tracking-[0.4em]
                    text-brand-gold
                    "

                  >

                    {collection.label}

                  </p>





                  <h3

                    className="
                    font-serif
                    text-5xl
                    font-medium
                    "

                  >

                    {collection.name}

                  </h3>





                  <p

                    className="
                    mt-5
                    text-sm
                    uppercase
                    tracking-[0.25em]
                    text-white/90
                    transition
                    group-hover:text-brand-gold
                    "

                  >

                    Shop Collection →

                  </p>


                </div>



              </Link>


            </motion.div>


          ))}



        </div>


      </div>


    </section>

  );

}


export default Collections;