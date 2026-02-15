import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";

export const runtime = "edge";

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
    <html lang="en">
      <head>
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
      <body
        className="antialiased"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          backgroundColor: "#A8D3F0",
          color: "#1C2E5A",
        }}
      >
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
