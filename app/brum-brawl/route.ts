export const dynamic = "force-dynamic";

export async function GET() {
  const source =
    "https://raw.githubusercontent.com/GazHipkiss/hipkissdigitalwebsite/brum-brawl-game/brum-brawl/index.html";

  const res = await fetch(source, { cache: "no-store" });

  if (!res.ok) {
    return new Response("Brum Brawl is temporarily unavailable.", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(await res.text(), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}
