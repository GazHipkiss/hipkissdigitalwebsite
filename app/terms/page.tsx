import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for engaging Hipkiss Digital for web and app development services.",
};

export default function TermsPage() {
  return (
    <article className="section" aria-labelledby="terms-heading">
      <div className="container-narrow max-w-3xl">
        <header className="mb-12">
          <h1 id="terms-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-muted">
            Last updated: February 2026
          </p>
        </header>

        <div className="prose-policy space-y-10 text-foreground">
          <section aria-labelledby="intro">
            <h2 id="intro" className="text-xl font-semibold text-foreground sm:text-2xl">
              1. Introduction
            </h2>
            <p className="mt-3 text-muted">
              These terms and conditions (&ldquo;Terms&rdquo;) apply to the use of the website hipkissdigital.com and to any services provided by Hipkiss Digital (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a web and app development studio in the United Kingdom. By using our website or engaging our services, you agree to these Terms. If you do not agree, please do not use the site or our services.
            </p>
          </section>

          <section aria-labelledby="services">
            <h2 id="services" className="text-xl font-semibold text-foreground sm:text-2xl">
              2. Services provided
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital provides web development, app development, and related consulting and support services. The specific scope, deliverables, and fees for any project will be set out in a separate proposal, quote, or statement of work agreed with you. These Terms apply to that engagement unless otherwise agreed in writing.
            </p>
          </section>

          <section aria-labelledby="no-guarantee">
            <h2 id="no-guarantee" className="text-xl font-semibold text-foreground sm:text-2xl">
              3. No guarantee / limitation of liability
            </h2>
            <p className="mt-3 text-muted">
              We will use reasonable skill and care in providing our services. We do not, however, guarantee any particular outcome, result, or level of traffic, revenue, or performance. To the fullest extent permitted by applicable law in England and Wales, we shall not be liable for any indirect, consequential, or special loss (including loss of profit, revenue, data, or goodwill) arising from your use of our website or our services. Our total liability to you in respect of any claim or series of connected claims arising out of or in connection with our services shall not exceed the total fees paid by you to us in respect of the relevant project in the twelve months preceding the claim. Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded or limited by law.
            </p>
          </section>

          <section aria-labelledby="client-responsibilities">
            <h2 id="client-responsibilities" className="text-xl font-semibold text-foreground sm:text-2xl">
              4. Client responsibilities
            </h2>
            <p className="mt-3 text-muted">
              You agree to provide content, materials, access (e.g. to existing systems or accounts), and approvals in a timely manner so we can deliver the agreed work. Delays in providing these may affect timelines and may result in additional cost. You are responsible for ensuring that any content or materials you provide do not infringe third-party rights and that you have the right to use them. You are responsible for maintaining the security of any login details or access we provide and for the use of any deliverables we hand over to you.
            </p>
          </section>

          <section aria-labelledby="ip">
            <h2 id="ip" className="text-xl font-semibold text-foreground sm:text-2xl">
              5. Intellectual property
            </h2>
            <p className="mt-3 text-muted">
              Unless otherwise agreed in writing: (a) we retain ownership of any pre-existing intellectual property we use in delivering the project (including tools, frameworks, and generic code); (b) upon receipt of full payment for the project, we assign to you the intellectual property rights in the custom deliverables created specifically for your project (e.g. custom code, designs, and copy produced for you). Any third-party components (e.g. open-source licences) will remain subject to their respective licences. We may use the project (and your name/logo if agreed) in our portfolio and marketing unless you request otherwise in writing.
            </p>
          </section>

          <section aria-labelledby="payments">
            <h2 id="payments" className="text-xl font-semibold text-foreground sm:text-2xl">
              6. Payments, deposits, and refunds
            </h2>
            <p className="mt-3 text-muted">
              Fees and payment terms will be set out in the relevant quote or statement of work. We may require a deposit or staged payments before or during the project. Invoices are due within the period stated (e.g. 14 or 30 days) unless otherwise agreed. We reserve the right to suspend work if payments are overdue. Refunds are considered on a case-by-case basis; if we have already incurred costs or completed work, no refund may be due. Any refund we agree to will be made within a reasonable time by the same method as payment.
            </p>
          </section>

          <section aria-labelledby="timelines">
            <h2 id="timelines" className="text-xl font-semibold text-foreground sm:text-2xl">
              7. Project timelines and revisions
            </h2>
            <p className="mt-3 text-muted">
              We will use reasonable endeavours to meet agreed timelines. Timelines are estimates and may be affected by your availability for feedback, scope changes, or factors outside our control. Revisions and change requests may be included within the agreed scope; additional work may be quoted separately. We will communicate clearly about any impact on time or cost.
            </p>
          </section>

          <section aria-labelledby="third-party">
            <h2 id="third-party" className="text-xl font-semibold text-foreground sm:text-2xl">
              8. Third-party services
            </h2>
            <p className="mt-3 text-muted">
              Our work may involve third-party services such as hosting (e.g. Cloudflare), domains, analytics, plugins, or app store distribution. Your use of those services may be subject to their own terms and fees. We are not responsible for the availability, pricing, or policies of third parties. You are responsible for complying with app store rules (e.g. Apple App Store, Google Play) and for any ongoing subscription or listing fees.
            </p>
          </section>

          <section aria-labelledby="app-terms">
            <h2 id="app-terms" className="text-xl font-semibold text-foreground sm:text-2xl">
              9. App-specific terms
            </h2>
            <p className="mt-3 text-muted">
              If we build an app for distribution via an app store, you are responsible for ensuring the app and any content comply with the store&apos;s guidelines and with applicable law. Apps we develop are not intended to provide medical, legal, or other regulated advice; any such use is at your own risk and you must obtain appropriate professional advice. You are responsible for any user-generated content, data handling, and privacy disclosures required by the stores or by law.
            </p>
          </section>

          <section aria-labelledby="warranty">
            <h2 id="warranty" className="text-xl font-semibold text-foreground sm:text-2xl">
              10. Warranty disclaimer
            </h2>
            <p className="mt-3 text-muted">
              Our website and any deliverables are provided &ldquo;as is&rdquo;. Except as expressly set out in a written agreement, we disclaim all warranties (express or implied) to the fullest extent permitted by law, including any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section aria-labelledby="governing-law">
            <h2 id="governing-law" className="text-xl font-semibold text-foreground sm:text-2xl">
              11. Governing law
            </h2>
            <p className="mt-3 text-muted">
              These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction to settle any dispute arising out of or in connection with these Terms or our services, save that we may bring proceedings in any other jurisdiction where you are resident or where assets are located.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-xl font-semibold text-foreground sm:text-2xl">
              12. Contact us
            </h2>
            <p className="mt-3 text-muted">
              For questions about these Terms or our services, please contact us via the contact page at hipkissdigital.com or by email using the address provided on our website.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-muted">
          <Link href="/" className="text-brand-mid underline transition-colors hover:text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">
            ← Back to home
          </Link>
        </p>
      </div>
    </article>
  );
}
