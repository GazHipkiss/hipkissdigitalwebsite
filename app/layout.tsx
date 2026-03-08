import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { SafeFetchPatch } from "./components/SafeFetchPatch";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hipkiss Digital | Web & App Development",
    template: "%s | Hipkiss Digital",
  },
  description:
    "Professional web and app development for businesses. Solo developer studio offering high-quality websites and applications with direct communication and no agency bloat.",
  keywords: ["web development", "app development", "Hipkiss Digital", "freelance developer"],
  authors: [{ name: "Hipkiss Digital" }],
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#A8D3F0" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var op=JSON.parse;JSON.parse=function(s,r){try{return op.apply(this,arguments)}catch(e){var t=(typeof s==="string"?s:String(s)).trim();if(t.charAt(0)==="{")return {};return []}};if(typeof window==="undefined"||!window.fetch)return;var f=window.fetch;window.fetch=function(i,n){return f.call(window,i,n).then(function(res){res.json=function(){return res.text().then(function(t){var s=(t&&t.trim())||"";if(s.charAt(0)!=="["&&s.charAt(0)!=="{")return null;try{return op(s)}catch(e){return null}})};return res})}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{background:#A8D3F0!important;color:#1C2E5A!important;min-height:100%;font-family:'Inter',system-ui,sans-serif;}`,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SafeFetchPatch />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
