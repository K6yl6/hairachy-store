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
    <nav
      className="
        sticky
        top-0
        z-40
        border-b
        border-black/[0.10]
        bg-brand-ivory/95
        backdrop-blur-xl
      "
    >
      {/* Mobile header */}
      <div
        className="
          mx-auto
          grid
          h-[76px]
          max-w-[1600px]
          grid-cols-[1fr_auto_1fr]
          items-center
          px-4
          md:hidden
        "
      >
        {/* Mobile menu — left */}
        <div className="justify-self-start">
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

                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  aria-label="Hairachy home"
                  className="inline-flex w-fit"
                >
                  <img
                    src="/logo/hairachy-logo.png"
                    alt="Hairachy"
                    className="
                      h-16
                      w-auto
                      object-contain
                    "
                  />
                </Link>
              </SheetHeader>

              <div
                className="
                  flex
                  min-h-[calc(100vh-105px)]
                  flex-col
                  justify-between
                  px-6
                  py-10
                "
              >
                <div>
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
                      tracking-[0.25em]
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

        {/* Actual logo — centre */}
        <Link
          to="/"
          aria-label="Hairachy home"
          className="
            flex
            items-center
            justify-center
            justify-self-center
          "
        >
          <img
            src="/logo/hairachy-logo.png"
            alt="Hairachy"
            className="
              h-14
              w-auto
              max-w-[150px]
              object-contain
            "
          />
        </Link>

        {/* Bag — right */}
        <div className="justify-self-end">
          <CartDrawer />
        </div>
      </div>

      {/* Desktop header */}
      <div
        className="
          mx-auto
          hidden
          h-[88px]
          max-w-[1600px]
          grid-cols-[1fr_auto_1fr]
          items-center
          px-8
          md:grid
          lg:px-12
        "
      >
        {/* Larger desktop logo */}
        <Link
          to="/"
          aria-label="Hairachy home"
          className="
            inline-flex
            w-fit
            items-center
            justify-self-start
          "
        >
          <img
            src="/logo/hairachy-logo.png"
            alt="Hairachy"
            className="
              h-18
              w-auto
              max-w-[210px]
              object-contain
              lg:h-20
              lg:max-w-[240px]
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

        {/* Desktop bag */}
        <div className="justify-self-end">
          <CartDrawer />
        </div>
      </div>
    </nav>
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
        items-center
        justify-between
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
          font-serif
          text-3xl
          font-medium
        "
      >
        {children}
      </span>

      <span
        className="
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