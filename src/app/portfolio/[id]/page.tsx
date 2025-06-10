import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetailsClient from './ProjectDetailsClient';

interface Props {
  params: Promise<{ id: string }>;
}

// دالة لجلب بيانات المشروع من API
async function getProject(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store', // تجديد البيانات في كل طلب
    });

    if (!response.ok) {
      return null;
    }

    const project = await response.json();
    return project; // إرجاع المشروع مباشرة
  } catch (error) {
    console.error('خطأ في جلب المشروع:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const project = await getProject(params.id);

    if (!project) {
      return {
        title: 'المشروع غير موجود | محترفين الديار العالمية',
        description: 'المشروع المطلوب غير متوفر'
      };
    }

    const mainImage = project.mediaItems?.find(item => item.type === 'IMAGE');
    const seoTitle = `${project.title} في ${project.location} | محترفين الديار العالمية جدة`;
    const seoDescription = `${project.description.substring(0, 150)}... مشروع ${project.category} في ${project.location} من محترفين الديار العالمية - أفضل شركة مظلات وسواتر في جدة`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: [
        project.category,
        'جدة',
        'السعودية',
        'مظلات',
        'سواتر',
        'برجولات',
        'تنسيق حدائق',
        'محترفين الديار',
        project.location,
        project.title
      ].join(', '),
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: 'article',
        url: `https://aldeyarksa.tech/portfolio/${params.id}`,
        siteName: 'محترفين الديار العالمية',
        locale: 'ar_SA',
        images: project.mediaItems?.filter(item => item.type === 'IMAGE').map(item => ({
          url: item.src,
          width: 1200,
          height: 630,
          alt: `${project.title} - محترفين الديار العالمية جدة`,
          type: 'image/webp'
        })) || []
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription.substring(0, 200),
        images: mainImage ? [mainImage.src] : []
      },
      alternates: {
        canonical: `https://aldeyarksa.tech/portfolio/${params.id}`
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1
        }
      }
    };
  } catch (error) {
    return {
      title: 'خطأ | محترفين الديار العالمية',
      description: 'حدث خطأ في تحميل المشروع'
    };
  }
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = await resolvedParams;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // إعداد structured data
  const images = project.mediaItems?.filter((item: any) => item.type === 'IMAGE') || [];
  const videos = project.mediaItems?.filter((item: any) => item.type === 'VIDEO') || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Organization",
      "name": "محترفين الديار العالمية",
      "url": "https://aldeyarksa.tech"
    },
    "dateCreated": project.createdAt,
    "dateModified": project.updatedAt,
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    },
    "category": project.category,
    "image": images.map((item: any) => ({
      "@type": "ImageObject",
      "url": item.src,
      "caption": item.title || project.title,
      "encodingFormat": "image/jpeg"
    })),
    "video": videos.map((item: any) => ({
      "@type": "VideoObject",
      "name": item.title || project.title,
      "description": item.description || project.description,
      "contentUrl": item.src,
      "encodingFormat": "video/mp4",
      "uploadDate": project.createdAt
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <ProjectDetailsClient project={project} />
      <Footer />
    </>
  );
}