import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
      fixed bottom-28 right-6
      z-50
      flex h-12 w-12
      items-center justify-center
      rounded-full
      bg-brand-black
      text-white
      shadow-xl
      transition
      hover:bg-brand-gold
      hover:text-black
      "
    >
      <ArrowUp size={22} />
    </button>
  );
}

export default BackToTop;
