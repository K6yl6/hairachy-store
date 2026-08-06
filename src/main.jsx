import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Toaster
      position="bottom-center"
      offset={{
        bottom: "42vh",
      }}
      mobileOffset={{
        bottom: "38vh",
        left: "16px",
        right: "16px",
      }}
      duration={1800}
      visibleToasts={1}
      gap={8}
      closeButton={false}
      richColors={false}
      toastOptions={{
        unstyled: true,

        classNames: {
          toast: `
            hairachy-toast
            flex
            w-fit
            max-w-[calc(100vw-32px)]
            items-center
            justify-center
            bg-brand-black
            px-5
            py-3
            text-white
            shadow-[0_12px_35px_rgba(0,0,0,0.22)]
          `,

          content: `
            flex
            items-center
            justify-center
          `,

          title: `
            text-center
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-white
          `,

          description: `
            mt-1
            text-center
            text-[10px]
            text-white/60
          `,

          icon: "hidden",
          closeButton: "hidden",
        },
      }}
      style={{
        zIndex: 99999,
      }}
    />
  </StrictMode>
);