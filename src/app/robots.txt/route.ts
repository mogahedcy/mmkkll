export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://aldeyarksa.tech/sitemap.xml

# Block certain paths if needed
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /create-icons.html
Disallow: /icon-generator.html

# Allow images for search engines
User-agent: Googlebot-Image
Allow: /images/
Allow: /uploads/

# Allow favicons
User-agent: *
Allow: /favicon.ico
Allow: /favicon.svg
Allow: /*.png
Allow: /manifest.json

# Crawl-delay for courtesy
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
