import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Backend/API and admin require server/edge; do not use output: "export"
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
    ],
  },
};

export default nextConfig;

// Only load Cloudflare adapter when not on Vercel (Vercel's image lacks GLIBC for workerd)
if (process.env.VERCEL !== "1") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
