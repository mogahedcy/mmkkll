export async function GET() {
  const baseUrl = 'https://aldeyarksa.tech';

  const staticPages = [
    '',
    '/services/mazallat',
    '/services/pergolas',
    '/services/sawater',
    '/services/sandwich-panel',
    '/services/renovation',
    '/services/landscaping',
    '/services/byoot-shaar',
    '/services/khayyam',
    '/portfolio',
    '/about',
    '/articles',
    '/contact',
    '/quote',
    '/faq',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
