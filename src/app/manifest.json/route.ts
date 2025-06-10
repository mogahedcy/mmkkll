
export async function GET() {
  const manifest = {
    name: "محترفين الديار العالمية",
    short_name: "الديار العالمية",
    description: "شركة متخصصة في المظلات والبرجولات والسواتر في جدة",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a365d",
    orientation: "portrait-primary",
    categories: ["business", "construction", "home"],
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
