import { useState } from "react";

function LuxuryImage({
  src,
  alt,
  className = "",
}) {

  const [loaded, setLoaded] = useState(false);


  return (

    <div className="relative overflow-hidden">

      {!loaded && (
        <div
          className="
          absolute inset-0
          animate-pulse
          bg-neutral-200
          "
        />
      )}


      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          ${className}
          transition-all
          duration-700
          ${
            loaded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105"
          }
        `}
      />


    </div>

  );

}

export default LuxuryImage;