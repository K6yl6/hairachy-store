import { useState } from "react";
import {
  Link,
  NavLink,
} from "react-router-dom";
import { Menu } from "lucide-react";

import CartDrawer from "@/components/cart/CartDrawer";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Shop",
    to: "/shop",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      {/* Launch announcement */}
      <div
        className="
          relative
          z-50
          flex
          min-h-9
          w-full
          max-w-full
          items-center
          justify-center
          overflow-hidden
          bg-brand-black
          px-4
          py-2
          text-center
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white
          sm:text-[10px]
          sm:tracking-[0.24em]
        "
      >
        Launch Offer — 5% Off All Hair
      </div>

      <nav
        className="
          sticky
          top-0
          z-40
          w-full
          max-w-full
          overflow-x-clip
          border-b
          border-black/[0.10]
          bg-brand-ivory/95
          backdrop-blur-xl
        "
      >
        {/* =========================
            MOBILE HEADER
        ========================= */}

        <div
          className="
            mx-auto
            grid
            h-[76px]
            w-full
            max-w-[1600px]
            grid-cols-[1fr_auto_1fr]
            items-center
            px-4
            md:hidden
          "
        >
          {/* Mobile menu */}
          <div className="min-w-0 justify-self-start">
            <Sheet
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    text-brand-black
                    transition-opacity
                    hover:opacity-55
                  "
                >
                  <Menu
                    size={24}
                    strokeWidth={1.5}
                  />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="
                  w-[88vw]
                  max-w-sm
                  overflow-x-hidden
                  border-r
                  border-brand-black/10
                  bg-brand-ivory
                  p-0
                  text-brand-black
                "
              >
                <SheetHeader
                  className="
                    border-b
                    border-brand-black/10
                    px-6
                    py-5
                    text-left
                  "
                >
                  <SheetTitle className="sr-only">
                    Hairachy navigation
                  </SheetTitle>

                  {/* Logo inside mobile menu */}
                  <Link
                    to="/"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    aria-label="Hairachy home"
                    className="
                      flex
                      h-[54px]
                      w-[145px]
                      max-w-full
                      items-center
                      justify-start
                    "
                  >
                    <img
                      src="/logo/hairachy-logo.png"
                      alt="Hairachy"
                      className="
                        block
                        max-h-[46px]
                        w-full
                        object-contain
                        object-left
                      "
                    />
                  </Link>
                </SheetHeader>

                <div
                  className="
                    flex
                    min-h-[calc(100dvh-105px)]
                    flex-col
                    justify-between
                    overflow-x-hidden
                    px-6
                    py-10
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-brand-black/40
                      "
                    >
                      Navigation
                    </p>

                    <div className="mt-8 border-t border-brand-black/10">
                      {navigation.map(
                        (item, index) => (
                          <MobileNavLink
                            key={item.to}
                            to={item.to}
                            number={`0${index + 1}`}
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                          >
                            {item.label}
                          </MobileNavLink>
                        )
                      )}
                    </div>
                  </div>

                  <div className="border-t border-brand-black/10 pt-6">
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-brand-black/40
                      "
                    >
                      Luxury in every strand
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile logo */}
          <Link
            to="/"
            aria-label="Hairachy home"
            className="
              flex
              h-[54px]
              w-[145px]
              max-w-[42vw]
              items-center
              justify-center
              justify-self-center
            "
          >
            <img
              src="/logo/hairachy-logo.png"
              alt="Hairachy"
              className="
                block
                max-h-[46px]
                w-full
                object-contain
                object-center
              "
            />
          </Link>

          {/* Mobile cart */}
          <div
            className="
              min-w-0
              justify-self-end
            "
          >
            <CartDrawer />
          </div>
        </div>

        {/* =========================
            DESKTOP HEADER
        ========================= */}

        <div
          className="
            mx-auto
            hidden
            h-[88px]
            w-full
            max-w-[1600px]
            grid-cols-[1fr_auto_1fr]
            items-center
            px-8
            md:grid
            lg:px-12
          "
        >
          {/* Desktop logo */}
          <Link
            to="/"
            aria-label="Hairachy home"
            className="
              flex
              h-[60px]
              w-[155px]
              items-center
              justify-start
              justify-self-start
            "
          >
            <img
              src="/logo/hairachy-logo.png"
              alt="Hairachy"
              className="
                block
                max-h-[50px]
                w-full
                object-contain
                object-left
              "
            />
          </Link>

          {/* Desktop navigation */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-10
            "
          >
            {navigation.map((item) => (
              <DesktopNavLink
                key={item.to}
                to={item.to}
              >
                {item.label}
              </DesktopNavLink>
            ))}
          </div>

          {/* Desktop cart */}
          <div className="justify-self-end">
            <CartDrawer />
          </div>
        </div>
      </nav>
    </>
  );
}

function DesktopNavLink({
  to,
  children,
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `
        relative
        py-2
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-brand-black
        transition-opacity

        after:absolute
        after:bottom-0
        after:left-0
        after:h-px
        after:bg-brand-black
        after:transition-all
        after:duration-300

        hover:opacity-55

        ${
          isActive
            ? "after:w-full"
            : "after:w-0 hover:after:w-full"
        }
      `}
    >
      {children}
    </NavLink>
  );
}

function MobileNavLink({
  to,
  number,
  onClick,
  children,
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) => `
        group
        flex
        min-w-0
        items-center
        justify-between
        gap-4
        border-b
        border-brand-black/10
        py-6
        transition-opacity
        hover:opacity-55

        ${
          isActive
            ? "text-brand-black"
            : "text-brand-black/60"
        }
      `}
    >
      <span
        className="
          min-w-0
          break-words
          font-serif
          text-3xl
          font-medium
        "
      >
        {children}
      </span>

      <span
        className="
          shrink-0
          text-[10px]
          font-semibold
          tracking-[0.2em]
          text-brand-black/35
        "
      >
        {number}
      </span>
    </NavLink>
  );
}

export default Navbar;