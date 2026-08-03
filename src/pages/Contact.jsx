import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

const CONTACT = {
  whatsapp:
    import.meta.env.VITE_WHATSAPP_NUMBER || "233597082755",

  phoneDisplay:
    import.meta.env.VITE_PHONE_DISPLAY || "059 708 2755",

  email:
    import.meta.env.VITE_SUPPORT_EMAIL ||
    "ladyrubyarthur@gmail.com",

  instagramHandle:
    import.meta.env.VITE_INSTAGRAM_HANDLE ||
    "hairachybylady_ruby",

  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL ||
    "https://www.instagram.com/hairachybylady_ruby/",
};

const initialForm = {
  name: "",
  email: "",
  orderNumber: "",
  message: "",
};

const topicMessages = {
  shipping:
    "Hello Hairachy, I would like information about shipping and delivery.",

  returns:
    "Hello Hairachy, I would like information about returns or exchanges.",

  tracking:
    "Hello Hairachy, I would like help tracking an order.",

  faqs:
    "Hello Hairachy, I have a question about your products or ordering process.",

  texture:
    "Hello Hairachy, I need help choosing the right texture and length.",
};

const commonQuestions = [
  {
    title: "Delivery and orders",
    description:
      "Ask about delivery arrangements, order progress, or collection.",
    message:
      "Hello Hairachy, I have a question about delivery or an order.",
  },
  {
    title: "Choosing a texture",
    description:
      "Get guidance selecting the right texture, length, or style.",
    message:
      "Hello Hairachy, I need help choosing the right texture and length.",
  },
  {
    title: "Returns and exchanges",
    description:
      "Contact customer care about an existing purchase.",
    message:
      "Hello Hairachy, I have a question about a return or exchange.",
  },
];

function Contact() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const topic = searchParams.get("topic");
    const topicMessage = topicMessages[topic];

    if (!topicMessage) return;

    setForm((currentForm) => {
      if (currentForm.message) return currentForm;

      return {
        ...currentForm,
        message: topicMessage,
      };
    });
  }, [searchParams]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function openWhatsApp(message) {
    const whatsappUrl = `https://wa.me/${
      CONTACT.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const orderNumber = form.orderNumber.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      toast.error("Complete all required fields.");
      return;
    }

    const contactMessage = [
      "Hello Hairachy,",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      orderNumber
        ? `Order number: ${orderNumber}`
        : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    openWhatsApp(contactMessage);

    toast.success(
      "Your message is ready to send on WhatsApp."
    );

    setForm(initialForm);
  }

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-black">
      {/* Heading */}
      <section className="border-b border-brand-black/10">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-brand-black/55
              "
            >
              Contact Hairachy
            </p>

            <h1
              className="
                mt-7
                font-serif
                text-5xl
                font-medium
                leading-[0.94]
                tracking-tight
                md:text-7xl
              "
            >
              We&apos;d love to
              <br />
              hear from you.
            </h1>

            <p
              className="
                mx-auto
                mt-7
                max-w-xl
                text-[15px]
                leading-7
                text-brand-black/65
                md:text-base
              "
            >
              Contact customer care for product guidance,
              order enquiries, styling assistance, or general
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Form and direct support */}
      <section className="border-b border-brand-black/10">
        <div
          className="
            container
            mx-auto
            grid
            max-w-7xl
            lg:grid-cols-[1.15fr_0.85fr]
          "
        >
          {/* Contact form */}
          <div
            className="
              border-brand-black/10
              px-6
              py-16
              md:px-12
              lg:border-r
              lg:px-16
              lg:py-20
            "
          >
            <div className="max-w-2xl">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-brand-black/55
                "
              >
                Send an enquiry
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-4xl
                  font-medium
                  leading-tight
                  md:text-5xl
                "
              >
                How can we help?
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-12"
              >
                <div className="grid gap-x-7 gap-y-9 md:grid-cols-2">
                  <FormField
                    label="Full name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                  />

                  <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />

                  <div className="md:col-span-2">
                    <FormField
                      label="Order number"
                      optional
                      name="orderNumber"
                      value={form.orderNumber}
                      onChange={updateField}
                      placeholder="Enter your order number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="
                        block
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-brand-black
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      required
                      rows={6}
                      placeholder="Tell us how we can help"
                      className="
                        mt-3
                        w-full
                        resize-none
                        border-0
                        border-b
                        border-brand-black/25
                        bg-transparent
                        px-0
                        py-4
                        text-[15px]
                        leading-7
                        text-brand-black
                        outline-none
                        transition-colors
                        placeholder:text-brand-black/35
                        focus:border-brand-black
                      "
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="
                    mt-10
                    flex
                    h-14
                    w-full
                    items-center
                    justify-center
                    gap-3
                    bg-brand-black
                    px-8
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-white
                    transition-colors
                    hover:bg-[#3a2a24]
                    md:w-auto
                    md:min-w-64
                  "
                >
                  <Send size={16} strokeWidth={1.7} />
                  Send message
                </button>

                <p className="mt-4 text-xs leading-5 text-brand-black/50">
                  Submitting this form opens a prefilled
                  WhatsApp conversation with Hairachy.
                </p>
              </form>
            </div>
          </div>

          {/* Direct support panel */}
          <aside
            className="
              bg-[#34251f]
              px-6
              py-16
              text-white
              md:px-12
              lg:px-14
              lg:py-20
            "
          >
            <div className="lg:sticky lg:top-28">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-white/55
                "
              >
                Direct support
              </p>

              <h2
                className="
                  mt-5
                  max-w-md
                  font-serif
                  text-4xl
                  font-medium
                  leading-tight
                  md:text-5xl
                "
              >
                Personal guidance, without the guesswork.
              </h2>

              <p className="mt-6 max-w-md text-[15px] leading-7 text-white/65">
                Speak directly with Hairachy for help choosing
                your preferred texture, style, and length.
              </p>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    "Hello Hairachy, I would like assistance choosing a hair product."
                  )
                }
                className="
                  mt-10
                  flex
                  w-full
                  items-center
                  justify-between
                  border
                  border-white/25
                  px-5
                  py-5
                  text-left
                  transition-colors
                  hover:border-white
                  hover:bg-white
                  hover:text-brand-black
                "
              >
                <span className="flex items-center gap-4">
                  <MessageCircle
                    size={20}
                    strokeWidth={1.5}
                  />

                  <span>
                    <span
                      className="
                        block
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                      "
                    >
                      WhatsApp support
                    </span>

                    <span className="mt-1 block text-xs opacity-65">
                      Chat on 059 708 2755
                    </span>
                  </span>
                </span>

                <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>

              <div className="mt-12 border-t border-white/15">
                <SupportItem
                  icon={Phone}
                  label="Call"
                  value={CONTACT.phoneDisplay}
                  href={`tel:+${CONTACT.whatsapp}`}
                />

                <SupportItem
                  icon={Mail}
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />

                <SupportItem
                  icon={FaInstagram}
                  label="Instagram"
                  value={`@${CONTACT.instagramHandle}`}
                  href={CONTACT.instagramUrl}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Quick questions */}
      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-7xl">
          <div
            className="
              grid
              gap-8
              border-b
              border-brand-black/15
              pb-10
              md:grid-cols-2
              md:items-end
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-brand-black/55
                "
              >
                Customer care
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-4xl
                  font-medium
                  md:text-5xl
                "
              >
                Common questions.
              </h2>
            </div>

            <p className="max-w-lg text-[15px] leading-7 text-brand-black/60 md:justify-self-end">
              Choose a topic to begin a prefilled WhatsApp
              conversation with Hairachy.
            </p>
          </div>

          <div className="grid md:grid-cols-3">
            {commonQuestions.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => openWhatsApp(item.message)}
                className={`
                  group
                  min-h-64
                  border-brand-black/15
                  py-10
                  text-left
                  transition-colors
                  hover:bg-[#e9dfd5]
                  md:px-8
                  ${
                    index < commonQuestions.length - 1
                      ? "border-b md:border-b-0 md:border-r"
                      : ""
                  }
                `}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-brand-black/45
                      "
                    >
                      0{index + 1}
                    </p>

                    <h3
                      className="
                        mt-6
                        font-serif
                        text-3xl
                        font-medium
                        text-brand-black
                      "
                    >
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-brand-black/60">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className="
                      mt-10
                      inline-flex
                      items-center
                      gap-2
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-brand-black
                    "
                  >
                    Ask Hairachy

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="
                        transition-transform
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  optional = false,
  type = "text",
  ...inputProps
}) {
  return (
    <div>
      <label
        htmlFor={inputProps.name}
        className="
          block
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-brand-black
        "
      >
        {label}

        {optional && (
          <span className="ml-2 font-normal tracking-normal text-brand-black/40">
            Optional
          </span>
        )}
      </label>

      <input
        id={inputProps.name}
        type={type}
        {...inputProps}
        className="
          mt-3
          w-full
          border-0
          border-b
          border-brand-black/25
          bg-transparent
          px-0
          py-4
          text-[15px]
          text-brand-black
          outline-none
          transition-colors
          placeholder:text-brand-black/35
          focus:border-brand-black
        "
      />
    </div>
  );
}

function SupportItem({
  icon: Icon,
  label,
  value,
  href,
}) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="
        block
        border-b
        border-white/15
        py-6
        transition-opacity
        hover:opacity-70
      "
    >
      <div className="flex items-start gap-4">
        <Icon
          size={19}
          className="mt-1 shrink-0"
        />

        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            {label}
          </p>

          <p className="mt-2 text-sm leading-6 text-white/80">
            {value}
          </p>
        </div>
      </div>
    </a>
  );
}

export default Contact;