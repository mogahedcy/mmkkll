export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/
Disallow: /_next/
Disallow: /test-*

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing
User-agent: bingbot
Allow: /
Crawl-delay: 1

Sitemap: https://aldeyarksa.tech/sitemap.xml`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}