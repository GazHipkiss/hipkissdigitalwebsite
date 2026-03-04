import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Hipkiss Digital. How we handle information on our website, MindKiss app, and other products.",
};

export default function PrivacyPage() {
  return (
    <article className="section" aria-labelledby="privacy-heading">
      <div className="container-narrow max-w-3xl">
        <header className="mb-12">
          <h1 id="privacy-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hipkiss Digital Privacy Policy
          </h1>
          <p className="mt-4 text-muted">
            Last updated: 4 March 2026
          </p>
        </header>

        <div className="prose-policy space-y-10 text-foreground">
          <p className="text-muted">
            Hipkiss Digital respects your privacy and is committed to protecting any information related to the use of our websites, applications, and services.
          </p>
          <p className="text-muted">
            This Privacy Policy explains how information is handled when you use products and services created by Hipkiss Digital.
          </p>
          <p className="text-muted">
            This policy applies to:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted">
            <li>the website hipkissdigital.com</li>
            <li>the MindKiss mobile application</li>
            <li>any current or future apps, websites, tools, or digital services developed by Hipkiss Digital.</li>
          </ul>
          <p className="text-muted">
            By using our website or applications, you agree to the practices described in this policy.
          </p>

          <section aria-labelledby="info-we-collect">
            <h2 id="info-we-collect" className="text-xl font-semibold text-foreground sm:text-2xl">
              1. Information We Collect
            </h2>
            <p className="mt-3 text-muted">
              Most Hipkiss Digital products are designed to collect little or no personal information.
            </p>
            <p className="mt-3 text-muted">
              Depending on the service you use, information may include:
            </p>
            <h3 className="mt-4 text-lg font-medium text-foreground">Information stored locally on your device</h3>
            <p className="mt-2 text-muted">
              Some applications (such as MindKiss) store data locally on your device, including:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-muted">
              <li>journal entries or logs</li>
              <li>ratings or reflections</li>
              <li>timer sessions</li>
              <li>notes or personal progress information</li>
            </ul>
            <p className="mt-3 text-muted">
              This information remains on your device only and is not transmitted to Hipkiss Digital.
            </p>
            <h3 className="mt-4 text-lg font-medium text-foreground">Website information</h3>
            <p className="mt-2 text-muted">
              When visiting hipkissdigital.com, standard technical information may be collected automatically by your browser or hosting provider, such as:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-muted">
              <li>IP address</li>
              <li>browser type</li>
              <li>device type</li>
              <li>pages visited</li>
              <li>general location (country level)</li>
            </ul>
            <p className="mt-3 text-muted">
              This information is used only for website operation, analytics, and security.
            </p>
          </section>

          <section aria-labelledby="how-used">
            <h2 id="how-used" className="text-xl font-semibold text-foreground sm:text-2xl">
              2. How Information Is Used
            </h2>
            <p className="mt-3 text-muted">
              Information may be used to:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-muted">
              <li>operate and maintain the website</li>
              <li>improve apps and services</li>
              <li>respond to support enquiries</li>
              <li>ensure security and prevent misuse</li>
            </ul>
            <p className="mt-3 text-muted">
              Hipkiss Digital does not sell, rent, or trade personal information to third parties.
            </p>
          </section>

          <section aria-labelledby="data-on-device">
            <h2 id="data-on-device" className="text-xl font-semibold text-foreground sm:text-2xl">
              3. Data Stored on Your Device
            </h2>
            <p className="mt-3 text-muted">
              Some applications developed by Hipkiss Digital are designed to store user data locally on the user&apos;s device only.
            </p>
            <p className="mt-3 text-muted">
              For example, the MindKiss mobile application stores personal entries, reflections, and usage information directly on the user&apos;s device.
            </p>
            <p className="mt-3 text-muted">
              Hipkiss Digital does not have access to this data, and it is not transmitted to external servers.
            </p>
            <p className="mt-3 text-muted">
              Users remain in full control of their data.
            </p>
          </section>

          <section aria-labelledby="no-accounts">
            <h2 id="no-accounts" className="text-xl font-semibold text-foreground sm:text-2xl">
              4. No Accounts or User Profiles
            </h2>
            <p className="mt-3 text-muted">
              Many Hipkiss Digital applications do not require accounts or user profiles.
            </p>
            <p className="mt-3 text-muted">
              Unless explicitly stated, our apps do not collect:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-muted">
              <li>names</li>
              <li>addresses</li>
              <li>phone numbers</li>
              <li>personal identity data</li>
              <li>precise location data</li>
            </ul>
            <p className="mt-3 text-muted">
              You can often use our apps anonymously.
            </p>
          </section>

          <section aria-labelledby="analytics">
            <h2 id="analytics" className="text-xl font-semibold text-foreground sm:text-2xl">
              5. Analytics and Tracking
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital may use basic analytics tools on its website to understand general traffic and improve the website experience.
            </p>
            <p className="mt-3 text-muted">
              Where analytics are used, they may collect anonymous information such as:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6 text-muted">
              <li>page visits</li>
              <li>device type</li>
              <li>approximate location</li>
              <li>referral sources</li>
            </ul>
            <p className="mt-3 text-muted">
              Our apps are generally designed without advertising or tracking systems.
            </p>
          </section>

          <section aria-labelledby="third-party-links">
            <h2 id="third-party-links" className="text-xl font-semibold text-foreground sm:text-2xl">
              6. Third-Party Links
            </h2>
            <p className="mt-3 text-muted">
              Our website or applications may include links to third-party websites, support organisations, or informational resources.
            </p>
            <p className="mt-3 text-muted">
              These external websites operate under their own privacy policies.
            </p>
            <p className="mt-3 text-muted">
              Hipkiss Digital is not responsible for the privacy practices of third-party websites.
            </p>
          </section>

          <section aria-labelledby="security">
            <h2 id="security" className="text-xl font-semibold text-foreground sm:text-2xl">
              7. Data Security
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital takes reasonable steps to protect information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mt-3 text-muted">
              However, no internet service or electronic storage system can be guaranteed to be completely secure.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2 id="children" className="text-xl font-semibold text-foreground sm:text-2xl">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital services are not specifically directed toward children under the age of 13.
            </p>
            <p className="mt-3 text-muted">
              We do not knowingly collect personal information from children.
            </p>
            <p className="mt-3 text-muted">
              If a parent or guardian believes a child has provided personal information through our services, they may contact us for assistance.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="text-xl font-semibold text-foreground sm:text-2xl">
              9. Contact and Support
            </h2>
            <p className="mt-3 text-muted">
              If you have questions about this Privacy Policy or any Hipkiss Digital product, you can contact:
            </p>
            <p className="mt-3 text-muted">
              <strong className="text-foreground">Hipkiss Digital</strong>
            </p>
            <p className="mt-2 text-muted">
              Email:{" "}
              <a href="mailto:support@hipkissdigital.com" className="text-brand-mid underline transition-colors hover:text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">
                support@hipkissdigital.com
              </a>
            </p>
            <p className="mt-2 text-muted">
              Website:{" "}
              <a href="https://hipkissdigital.com" className="text-brand-mid underline transition-colors hover:text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand-mid focus:ring-offset-2 rounded">
                https://hipkissdigital.com
              </a>
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes" className="text-xl font-semibold text-foreground sm:text-2xl">
              10. Changes to This Policy
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital may update this Privacy Policy occasionally to reflect updates to our services or legal requirements.
            </p>
            <p className="mt-3 text-muted">
              When changes are made, the &ldquo;Last updated&rdquo; date at the top of this page will be revised.
            </p>
            <p className="mt-3 text-muted">
              Continued use of our services after updates indicates acceptance of the revised policy.
            </p>
          </section>

          <section aria-labelledby="privacy-matters">
            <h2 id="privacy-matters" className="text-xl font-semibold text-foreground sm:text-2xl">
              11. Your Privacy Matters
            </h2>
            <p className="mt-3 text-muted">
              Hipkiss Digital builds tools intended to support people&apos;s lives and wellbeing.
            </p>
            <p className="mt-3 text-muted">
              Respecting privacy and minimizing data collection are core principles of how these products are designed.
            </p>
            <p className="mt-3 text-muted">
              Where possible, apps are built to keep personal information private and stored locally on the user&apos;s device.
            </p>
            <p className="mt-4 text-muted">
              <strong className="text-foreground">Developer</strong><br />
              Hipkiss Digital<br />
              United Kingdom
            </p>
          </section>

          <p className="mt-6 rounded-lg border border-border bg-surface-panel/50 p-4 text-sm text-muted">
            This privacy policy applies to all applications developed by Hipkiss Digital, including the MindKiss mobile application.
          </p>
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
