
import { prisma } from '@/lib/prisma';

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

  // جلب جميع المشاريع مع الوسائط
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      updatedAt: true,
      mediaItems: {
        select: {
          src: true,
          type: true,
          updatedAt: true
        }
      }
    }
  });

  const staticSitemap = staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('');

  // إضافة صفحات المشاريع
  const projectsSitemap = projects
    .map(
      (project) => `
  <url>
    <loc>${baseUrl}/portfolio/${project.id}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    ${project.mediaItems.length > 0 ? `
    <image:image>
      ${project.mediaItems
        .filter(media => media.type === 'IMAGE')
        .map(media => `
      <image:loc>${media.src}</image:loc>`)
        .join('')}
    </image:image>
    <video:video>
      ${project.mediaItems
        .filter(media => media.type === 'VIDEO')
        .map(media => `
      <video:content_loc>${media.src}</video:content_loc>`)
        .join('')}
    </video:video>` : ''}
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${staticSitemap}
  ${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // تحديث كل ساعة
    },
  });
}
