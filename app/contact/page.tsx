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
      <section className="section">
        <div className="container-narrow max-w-2xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact
            </h1>
            <p className="mt-6 text-lg text-muted">
              Have a project in mind? Describe what you need and I’ll get back to you within 24 hours. No obligation — just a straightforward conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="panel section border-t border-border"
        aria-labelledby="contact-form"
      >
        <div className="container-narrow max-w-xl">
          <Reveal>
            <h2 id="contact-form" className="text-xl font-semibold text-foreground">
              Send an enquiry
            </h2>
            <form
              action="#"
              method="post"
              className="mt-8 space-y-6"
              aria-label="Contact form"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 block w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground placeholder:text-muted-light focus:border-brand-mid focus:outline-none focus:ring-1 focus:ring-brand-mid transition-colors duration-200"
                  placeholder="Tell me about your project, timeline, and budget if you have one in mind."
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full py-3"
                >
                  Send message
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-muted">
              This form is a placeholder. Connect it to your preferred backend or service (e.g. Formspree, Resend, or your own API) to receive enquiries.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
