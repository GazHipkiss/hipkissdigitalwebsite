import type { Metadata } from "next";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your web or app project. I respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Contact
            </h1>
            <p className="mt-6 text-lg text-[var(--muted)]">
              Have a project in mind? Describe what you need and I’ll get back to you within 24 hours. No obligation — just a straightforward conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="border-t border-[var(--border)] px-6 py-16 lg:px-8 lg:py-20"
        aria-labelledby="contact-form"
      >
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h2 id="contact-form" className="text-xl font-semibold text-[var(--foreground)]">
              Send an enquiry
            </h2>
            <form
              action="#"
              method="post"
              className="mt-8 space-y-6"
              aria-label="Contact form"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 block w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-light)] focus:border-[var(--brand-mid)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-mid)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 block w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-light)] focus:border-[var(--brand-mid)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-mid)]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 block w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-light)] focus:border-[var(--brand-mid)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-mid)]"
                  placeholder="Tell me about your project, timeline, and budget if you have one in mind."
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[var(--brand-dark)] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-mid)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-mid)] focus:ring-offset-2"
                >
                  Send message
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-[var(--muted)]">
              This form is a placeholder. Connect it to your preferred backend or service (e.g. Formspree, Resend, or your own API) to receive enquiries.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
