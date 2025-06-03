import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import StructuredDataScript from "@/components/StructuredDataScript";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "محترفين الديار العالمية | مظلات، برجولات، سواتر، ساندوتش بانل، ترميم، تنسيق حدائق جدة",
  description:
    "محترفين الديار العالمية - شركة متخصصة في جدة تقدم خدمات شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. خبرة 15 عاماً في تصميم وتنفيذ المشاريع بأعلى معايير الجودة في جدة والمملكة العربية السعودية.",
  keywords:
    "محترفين الديار العالمية، محترفين الديار جدة، مظلات سيارات جدة، برجولات حدائق جدة، سواتر خصوصية جدة، ساندوتش بانل جدة، ترميم ملحقات جدة، تنسيق حدائق جدة، بيوت شعر جدة، خيام ملكية جدة، مقاولات جدة، تركيب مظلات، تركيب برجولات، تركيب سواتر، أعمال معادن جدة، تنسيق مساحات خارجية",
  authors: [{ name: "محترفين الديار العالمية" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  canonical: "https://aldeyarksa.tech",
  alternates: {
    canonical: "https://aldeyarksa.tech",
    languages: {
      "ar-SA": "https://aldeyarksa.tech",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  openGraph: {
    title: "أفضل مظلات وبرجولات وساندوتش بانل في جدة | محترفين الديار العالمية",
    description: "خبرة 15 عاماً في تركيب مظلات، برجولات، ساندوتش بانل، وترميم ملحقات في جدة",
    type: "website",
    locale: "ar_SA",
    siteName: "محترفين الديار العالمية",
    url: "https://aldeyarksa.tech",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "محترفين الديار العالمية - مظلات وبرجولات جدة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أفضل مظلات وبرجولات وساندوتش بانل في جدة | محترفين الديار العالمية",
    description: "خبرة 15 عاماً في تركيب مظلات، برجولات، ساندوتش بانل، وترميم ملحقات في جدة",
    images: ["/images/og-image.jpg"],
  },
  manifest: "/manifest.json",
  other: {
    "geo.region": "SA-02",
    "geo.placename": "جدة",
    "geo.position": "21.485811;39.192505",
    "ICBM": "21.485811, 39.192505",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "محترفين الديار العالمية",
  image: "https://aldeyarksa.tech/images/og-image.jpg",
  "@id": "https://aldeyarksa.tech",
  url: "https://aldeyarksa.tech",
  telephone: "+966555555555",
  address: {
    "@type": "PostalAddress",
    streetAddress: "جدة",
    addressLocality: "جدة",
    addressRegion: "مكة",
    postalCode: "22233",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.485811,
    longitude: 39.192505,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "16:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/aldeyar.jeddah",
    "https://www.instagram.com/aldeyar.jeddah",
    "https://twitter.com/aldeyar_jeddah",
  ],
  description:
    "محترفين الديار العالمية - شركة متخصصة في جدة تقدم خدمات شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. خبرة 15 عاماً في تصميم وتنفيذ المشاريع بأعلى معايير الجودة في جدة والمملكة العربية السعودية.",
  priceRange: "SAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <head>
        <link rel="canonical" href="https://aldeyarksa.tech" />
        <StructuredDataScript data={structuredData} />
      </head>
      <body suppressHydrationWarning className="antialiased font-arabic">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
