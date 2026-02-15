import type { Metadata } from "next";
import { Reveal } from "../components/Reveal";
import { ContactForm } from "./ContactForm";

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

      <section className="panel section border-t border-border" aria-labelledby="contact-form">
        <div className="container-narrow max-w-xl">
          <Reveal>
            <h2 id="contact-form" className="text-xl font-semibold text-foreground">
              Send an enquiry
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
