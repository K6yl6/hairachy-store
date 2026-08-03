import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function Hero() {

  return (

    <section className="relative overflow-hidden bg-brand-ivory">


      <div
        className="
        container
        mx-auto
        grid
        min-h-[700px]
        items-center
        gap-20
        px-6
        py-20
        md:grid-cols-2
        "
      >


        {/* Text Section */}

        <div className="space-y-8 overflow-visible">


          <motion.p

            className="
            text-sm
            uppercase
            tracking-[0.45em]
            text-brand-gold
            "

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

          >

            Luxury In Every Strand

          </motion.p>





          <motion.h1

            className="
            w-full
            max-w-xl
            font-serif
            text-5xl
            font-medium
            leading-[0.95]
            tracking-tight
            text-brand-black
            md:text-6xl
            lg:text-7xl
            "

            initial={{
              opacity: 0,
              y: 40
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.8
            }}

          >

            Uncompromising
            <br />

            Quality.
            <br />

            Unmatched
            <br />

            Elegance.

          </motion.h1>





          <motion.p

            className="
            max-w-lg
            text-lg
            leading-relaxed
            text-neutral-600
            "

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              delay: 0.3,
              duration: 0.8
            }}

          >

            Premium hair extensions designed to elevate your
            style with timeless beauty, confidence, and elegance.

          </motion.p>





          <motion.div

            className="
            flex
            items-center
            gap-5
            "

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.5,
              duration:0.6
            }}

          >


            <Link to="/shop">

              <button

                className="
                bg-brand-black
                px-10
                py-4
                text-sm
                uppercase
                tracking-[0.25em]
                text-white
                transition-all
                duration-300
                hover:bg-brand-gold
                hover:text-black
                "

              >

                Shop Collection

              </button>


            </Link>


          </motion.div>




        </div>







        {/* Hero Image */}

        <motion.div

          className="
          relative
          "

          initial={{
            opacity:0,
            scale:0.96
          }}

          animate={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:1
          }}

        >


          <img

            src="/hero/hero-hair.jpg"

            alt="Luxury hair extension model"

            className="
            h-[650px]
            w-full
            object-cover
            "

          />



          <div

            className="
            absolute
            -bottom-5
            -left-5
            h-32
            w-32
            border
            border-brand-gold/30
            "

          />


        </motion.div>




      </div>


    </section>

  );

}


export default Hero;