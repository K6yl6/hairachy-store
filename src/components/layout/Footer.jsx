import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

const CONTACT = {
  phone:
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    "233597082755",

  phoneDisplay:
    import.meta.env.VITE_PHONE_DISPLAY ||
    "059 708 2755",

  email:
    import.meta.env.VITE_SUPPORT_EMAIL ||
    "Hairachybylrsupport@gmail.com",

  instagramHandle:
    import.meta.env.VITE_INSTAGRAM_HANDLE ||
    "hairachybylady_ruby",

  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL ||
    "https://www.instagram.com/hairachybylady_ruby/",
};

function Footer() {
  const [email, setEmail] = useState("");

  const currentYear = new Date().getFullYear();

  const privacyUrl =
    import.meta.env.VITE_PRIVACY_URL;

  const termsUrl =
    import.meta.env.VITE_TERMS_URL;

  const legalLinks = [
    privacyUrl
      ? {
          label: "Privacy policy",
          href: privacyUrl,
        }
      : null,

    termsUrl
      ? {
          label: "Terms of service",
          href: termsUrl,
        }
      : null,
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(
    "Hello Hairachy, I would like to make an enquiry."
  )}`;

  function handleNewsletterSubmit(event) {
    event.preventDefault();

    const cleanedEmail = email
      .trim()
      .toLowerCase();

    if (!cleanedEmail) {
      toast.error(
        "Enter your email address."
      );

      return;
    }

    const subject =
      "Join the Hairachy Club";

    const body = [
      "Hello Hairachy,",
      "",
      "Please add me to the Hairachy mailing list.",
      "",
      `Email address: ${cleanedEmail}`,
    ].join("\n");

    const mailtoUrl =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(
        subject
      )}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    toast.success(
      "Your email application is opening."
    );

    setEmail("");
  }

  return (
    <footer className="bg-[#15120f] text-[#f3eee8]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-14">
        <div
          className="
            grid
            gap-14
            py-16
            md:py-20
            lg:grid-cols-[1.2fr_0.75fr_0.9fr_1.35fr]
            lg:gap-10
            lg:py-24
          "
        >
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              aria-label="Hairachy home"
              className="inline-block"
            >
              <img
                src="/logo/hairachy-logo.png"
                alt="Hairachy"
                className="h-20 w-auto object-contain md:h-24"
              />
            </Link>

            <p
              className="
                mt-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/65
              "
            >
              Luxury in every strand
            </p>

            <p
              className="
                mt-5
                max-w-xs
                text-sm
                leading-6
                text-white/48
              "
            >
              A considered collection of hair
              textures and protective styles
              created for confident, expressive
              looks.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:+${CONTACT.phone}`}
                className="
                  flex
                  items-center
                  gap-3
                  text-xs
                  text-white/65
                  transition-colors
                  hover:text-white
                "
              >
                <Phone
                  size={15}
                  strokeWidth={1.5}
                />

                {CONTACT.phoneDisplay}
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="
                  flex
                  items-center
                  gap-3
                  break-all
                  text-xs
                  text-white/65
                  transition-colors
                  hover:text-white
                "
              >
                <Mail
                  size={15}
                  strokeWidth={1.5}
                />

                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop">
            <FooterInternalLink to="/shop">
              Shop all hair
            </FooterInternalLink>
          </FooterColumn>

          {/* Customer care */}
          <FooterColumn title="Customer care">
            <FooterInternalLink to="/contact">
              Contact Hairachy
            </FooterInternalLink>

            <FooterExternalLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle
                size={15}
                strokeWidth={1.5}
              />

              WhatsApp Hairachy
            </FooterExternalLink>

            <FooterExternalLink
              href={`mailto:${CONTACT.email}`}
            >
              <Mail
                size={15}
                strokeWidth={1.5}
              />

              Email Hairachy
            </FooterExternalLink>
          </FooterColumn>

          {/* Newsletter and Instagram */}
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-white/45
              "
            >
              Join the club
            </p>

            <h2
              className="
                mt-5
                max-w-md
                font-serif
                text-3xl
                font-medium
                leading-tight
                md:text-4xl
              "
            >
              First access to new hair drops.
            </h2>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-6
                text-white/48
              "
            >
              Receive collection announcements,
              selected offers, and hair-care
              updates.
            </p>

            <form
              onSubmit={
                handleNewsletterSubmit
              }
              className="mt-8"
            >
              <label
                htmlFor="footer-email"
                className="sr-only"
              >
                Email address
              </label>

              <div
                className="
                  flex
                  items-center
                  border-b
                  border-white/35
                  transition-colors
                  focus-within:border-white
                "
              >
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="
                    min-w-0
                    flex-1
                    border-0
                    bg-transparent
                    py-4
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/35
                  "
                />

                <button
                  type="submit"
                  aria-label="Request to join the Hairachy mailing list"
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    text-white
                    transition-colors
                    hover:bg-white
                    hover:text-brand-black
                  "
                >
                  <ArrowRight
                    size={19}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </form>

            <p className="mt-3 text-[10px] leading-5 text-white/35">
              This opens an email request to join
              the Hairachy mailing list.
            </p>

            <div className="mt-10">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Follow Hairachy
              </p>

              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Hairachy on Instagram"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-4
                  border
                  border-white/20
                  px-5
                  py-4
                  text-sm
                  text-white/70
                  transition-all
                  hover:border-white
                  hover:bg-white
                  hover:text-brand-black
                "
              >
                <FaInstagram size={18} />

                @{CONTACT.instagramHandle}

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="
            flex
            flex-col
            gap-5
            border-t
            border-white/15
            py-7
            text-[11px]
            text-white/40
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {currentYear} Hairachy. All rights
            reserved | Designed by Cyberverx.
          </p>

          {legalLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    transition-colors
                    hover:text-white
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}) {
  return (
    <div>
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.28em]
          text-white/45
        "
      >
        {title}
      </p>

      <nav className="mt-7 flex flex-col items-start gap-4">
        {children}
      </nav>
    </div>
  );
}

function FooterInternalLink({
  to,
  children,
}) {
  return (
    <Link
      to={to}
      className="
        group
        relative
        text-sm
        text-white/62
        transition-colors
        hover:text-white
      "
    >
      {children}

      <span
        className="
          absolute
          -bottom-1
          left-0
          h-px
          w-0
          bg-white
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}

function FooterExternalLink({
  href,
  children,
  ...props
}) {
  return (
    <a
      href={href}
      {...props}
      className="
        group
        relative
        inline-flex
        items-center
        gap-2
        text-sm
        text-white/62
        transition-colors
        hover:text-white
      "
    >
      {children}

      <span
        className="
          absolute
          -bottom-1
          left-0
          h-px
          w-0
          bg-white
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </a>
  );
}

export default Footer;