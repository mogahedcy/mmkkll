import type { Metadata } from 'next';
import { Suspense } from 'react';
import PortfolioPageClient from './PortfolioPageClient';
import StructuredDataScript from '@/components/StructuredDataScript';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'معرض أعمال محترفين الديار العالمية | مشاريع مظلات وبرجولات في جدة',
  description: 'تصفح معرض أعمالنا المتميز في جدة. أكثر من 5000 مشروع ناجح في المظلات، البرجولات، السواتر، ساندوتش بانل، تنسيق الحدائق، والترميم. اكتشف جودة العمل والإبداع في التصميم.',
  keywords: 'معرض أعمال, مشاريع مظلات جدة, برجولات جدة, سواتر جدة, ساندوتش بانل, تنسيق حدائق, ترميم, محترفين الديار العالمية',
  authors: [{ name: 'محترفين الديار العالمية' }],
  creator: 'محترفين الديار العالمية',
  publisher: 'محترفين الديار العالمية',
  robots: 'index, follow',
  openGraph: {
    title: 'معرض أعمال محترفين الديار العالمية - مشاريع مميزة في جدة',
    description: 'اكتشف أعمالنا المتميزة في المظلات والبرجولات والسواتر وجميع خدماتنا في جدة',
    url: 'https://aldeyarksa.tech/portfolio',
    siteName: 'محترفين الديار العالمية',
    images: [
      {
        url: 'https://aldeyarksa.tech/uploads/mazallat-1.webp',
        width: 1200,
        height: 630,
        alt: 'معرض أعمال محترفين الديار العالمية'
      }
    ],
    locale: 'ar_SA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معرض أعمال محترفين الديار العالمية',
    description: 'اكتشف مشاريعنا المتميزة في جدة',
    images: ['https://aldeyarksa.tech/uploads/mazallat-1.webp']
  },
  alternates: {
    canonical: 'https://aldeyarksa.tech/portfolio'
  }
};

// البيانات المنظمة للصفحة
const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "معرض أعمال محترفين الديار العالمية",
  "description": "مجموعة شاملة من مشاريعنا المتميزة في جدة",
  "url": "https://aldeyarksa.tech/portfolio",
  "mainEntity": {
    "@type": "ItemList",
    "name": "مشاريع محترفين الديار العالمية",
    "description": "قائمة بأهم مشاريعنا في المظلات والبرجولات والسواتر",
    "numberOfItems": "5000+",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "مظلات السيارات",
        "description": "تصميم وتركيب مظلات سيارات عالية الجودة"
      },
      {
        "@type": "Service", 
        "name": "البرجولات الخشبية",
        "description": "برجولات خشبية فاخرة للحدائق والمساحات الخارجية"
      },
      {
        "@type": "Service",
        "name": "السواتر المعدنية",
        "description": "سواتر معدنية للخصوصية والحماية"
      }
    ]
  },
  "provider": {
    "@type": "Organization",
    "name": "محترفين الديار العالمية",
    "url": "https://aldeyarksa.tech",
    "logo": "https://aldeyarksa.tech/logo.png"
  }
};

export default function PortfolioPage() {
  return (
    <>
      <StructuredDataScript data={portfolioStructuredData} />
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">جاري تحميل معرض الأعمال...</p>
          </div>
        </div>
      }>
        <PortfolioPageClient />
      </Suspense>
      <Footer />
    </>
  );
}