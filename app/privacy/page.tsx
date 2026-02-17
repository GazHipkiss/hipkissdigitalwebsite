import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Hipkiss Digital. How we collect, use, and protect your data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <article className="section" aria-labelledby="privacy-heading">
      <div className="container-narrow max-w-3xl">
        <header className="mb-12">
          <h1 id="privacy-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted">
            Last updated: February 2026
          </p>
        </header>

        <div className="prose-policy space-y-10 text-foreground">
          <section aria-labelledby="who-we-are">
            <h2 id="who-we-are" className="text-xl font-semibold text-foreground sm:text-2xl">
              1. Who we are
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a web and app development studio based in the United Kingdom. We operate the website hipkissdigital.com and related services. For the purposes of UK data protection law, we are the data controller in respect of personal data collected through this website and in the course of providing our services.
            </p>
          </section>

          <section aria-labelledby="data-we-collect">
            <h2 id="data-we-collect" className="text-xl font-semibold text-foreground sm:text-2xl">
              2. What data we collect
            </h2>
            <p className="mt-3 text-muted">
              We may collect and process the following categories of personal data:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
              <li><strong className="text-foreground">Contact form data:</strong> When you submit an enquiry via our contact form, we collect your name, email address, and any message, service, or budget details you provide.</li>
              <li><strong className="text-foreground">Email and correspondence:</strong> If you contact us by email or through the site, we keep a record of that correspondence.</li>
              <li><strong className="text-foreground">Analytics and usage data:</strong> When you use our website, we may collect technical and usage information such as your IP address, browser type, device type, pages visited, and referring site. This may be collected via cookies or similar technologies where you have consented or where we have a legitimate interest (see below).</li>
              <li><strong className="text-foreground">Cookies:</strong> Our site may use cookies and similar technologies for essential operation, security, and (with your consent) analytics. See the Cookies section below for more detail.</li>
            </ul>
          </section>

          <section aria-labelledby="why-we-collect">
            <h2 id="why-we-collect" className="text-xl font-semibold text-foreground sm:text-2xl">
              3. Why we collect it
            </h2>
            <p className="mt-3 text-muted">
              We use your data to respond to your enquiries, provide quotes and services, improve our website and services, and comply with legal obligations. We do not sell your personal data to third parties.
            </p>
          </section>

          <section aria-labelledby="lawful-basis">
            <h2 id="lawful-basis" className="text-xl font-semibold text-foreground sm:text-2xl">
              4. Lawful basis under UK GDPR
            </h2>
            <p className="mt-3 text-muted">
              Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, we process your personal data on the following bases:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
              <li><strong className="text-foreground">Consent:</strong> Where you have given clear consent (e.g. for non-essential cookies or marketing communications). You can withdraw consent at any time.</li>
              <li><strong className="text-foreground">Legitimate interests:</strong> Where processing is necessary for our legitimate interests (e.g. responding to enquiries, improving our site, security) and your interests do not override those interests. You have the right to object to processing based on legitimate interests.</li>
              <li><strong className="text-foreground">Contract:</strong> Where processing is necessary to perform a contract with you or to take steps at your request before entering into a contract.</li>
              <li><strong className="text-foreground">Legal obligation:</strong> Where we must process data to comply with the law.</li>
            </ul>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className="text-xl font-semibold text-foreground sm:text-2xl">
              5. Data retention
            </h2>
            <p className="mt-3 text-muted">
              We keep your data only for as long as necessary for the purposes set out in this policy. Contact form and enquiry data are typically retained for a reasonable period (e.g. up to several years) so we can respond to follow-ups and maintain a record of our business communications. Analytics data may be retained in aggregated or anonymised form. When data is no longer needed, we delete or anonymise it in line with our retention schedule and UK GDPR principles.
            </p>
          </section>

          <section aria-labelledby="sharing">
            <h2 id="sharing" className="text-xl font-semibold text-foreground sm:text-2xl">
              6. Data sharing
            </h2>
            <p className="mt-3 text-muted">
              We may share your data with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
              <li><strong className="text-foreground">Email and communication providers:</strong> For example, Resend or similar services, to send and manage emails relating to your enquiries. These providers process data on our instructions and in accordance with their privacy policies.</li>
              <li><strong className="text-foreground">Hosting and infrastructure:</strong> Our website and related systems are hosted on Cloudflare and similar providers. Data may be processed by them in the course of providing hosting, security, and performance services.</li>
              <li><strong className="text-foreground">Analytics providers:</strong> If you accept analytics cookies, we may use third-party analytics services that process usage data. We choose providers that commit to appropriate data protection standards.</li>
            </ul>
            <p className="mt-3 text-muted">
              We do not sell or rent your personal data. We may disclose data if required by law (e.g. to regulators or law enforcement).
            </p>
          </section>

          <section aria-labelledby="transfers">
            <h2 id="transfers" className="text-xl font-semibold text-foreground sm:text-2xl">
              7. International transfers
            </h2>
            <p className="mt-3 text-muted">
              Some of our service providers may be located outside the UK (e.g. in the EEA or the US). Where we transfer personal data outside the UK, we ensure appropriate safeguards are in place, such as UK adequacy decisions, standard contractual clauses approved by the UK authorities, or other mechanisms recognised under UK data protection law. You can request more information about these safeguards by contacting us.
            </p>
          </section>

          <section aria-labelledby="your-rights">
            <h2 id="your-rights" className="text-xl font-semibold text-foreground sm:text-2xl">
              8. Your rights
            </h2>
            <p className="mt-3 text-muted">
              Under UK data protection law you have the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
              <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-foreground">Erasure:</strong> Request deletion of your data in certain circumstances.</li>
              <li><strong className="text-foreground">Restriction:</strong> Request that we restrict processing in certain circumstances.</li>
              <li><strong className="text-foreground">Objection:</strong> Object to processing based on legitimate interests or for direct marketing.</li>
              <li><strong className="text-foreground">Data portability:</strong> Request a copy of your data in a structured, machine-readable format where applicable.</li>
            </ul>
            <p className="mt-3 text-muted">
              You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-mid underline transition-colors hover:text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">ico.org.uk</a>.
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="text-xl font-semibold text-foreground sm:text-2xl">
              9. Cookies and analytics
            </h2>
            <p className="mt-3 text-muted">
              We use cookies and similar technologies as follows:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
              <li><strong className="text-foreground">Strictly necessary:</strong> Required for the site to function (e.g. security, load balancing). These do not require consent under UK law.</li>
              <li><strong className="text-foreground">Analytics (optional):</strong> If you accept analytics cookies via our cookie banner, we may use cookies to understand how visitors use our site. You can withdraw consent at any time via our cookie banner or by adjusting your browser settings.</li>
            </ul>
            <p className="mt-3 text-muted">
              You can control or delete cookies through your browser settings. Blocking all cookies may affect how the site works. For more on how we use cookies, see this policy and our cookie banner on the site.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-xl font-semibold text-foreground sm:text-2xl">
              10. Contact us
            </h2>
            <p className="mt-3 text-muted">
              For any questions about this privacy policy, or to exercise your rights, please contact us by email at the address shown on our website (e.g. via the contact page at hipkissdigital.com). We will respond within a reasonable time and in any event within one month where a statutory deadline applies.
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
