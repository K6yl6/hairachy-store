import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

function WhatsAppButton() {
  const phone =
    import.meta.env.VITE_WHATSAPP_NUMBER || "233597082755";

  const message =
    "Hello Hairachy, I would like assistance with choosing a hair product.";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Hairachy on WhatsApp"
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 12,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        group
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        border
        border-[#8f7440]
        bg-[#171310]
        text-[#d8bd78]
        shadow-[0_14px_35px_rgba(0,0,0,0.28)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#d8bd78]
        hover:bg-[#2d211c]
        hover:text-white
        md:bottom-7
        md:right-7
      "
    >
      <FaWhatsapp size={27} />

      <span
        className="
          pointer-events-none
          absolute
          right-[68px]
          hidden
          whitespace-nowrap
          bg-[#171310]
          px-4
          py-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-white
          shadow-xl
          group-hover:block
          md:block
          md:translate-x-2
          md:opacity-0
          md:transition-all
          md:duration-300
          md:group-hover:translate-x-0
          md:group-hover:opacity-100
        "
      >
        Chat with us
      </span>
    </motion.a>
  );
}

export default WhatsAppButton;