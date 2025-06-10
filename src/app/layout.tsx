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
  metadataBase: new URL('https://aldeyarksa.tech'),
  title: {
    default: "محترفين الديار العالمية | أفضل مظلات وبرجولات جدة - خبرة 15 عام",
    template: "%s | محترفين الديار العالمية"
  },
  description:
    "🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر. خبرة 15 عاماً ✅ ضمان 10 سنوات ✅ تركيب احترافي ✅ أسعار منافسة. اتصل الآن للحصول على استشارة مجانية!",
  keywords:
    "مظلات سيارات جدة، برجولات خشبية جدة، سواتر خصوصية جدة، محترفين الديار العالمية، تركيب مظلات جدة، برجولات حدائق، مظلات حديد، سواتر معدنية، ساندوتش بانل جدة، تنسيق حدائق جدة، بيوت شعر تراثية، خيام ملكية جدة، مقاول مظلات جدة، شركة برجولات جدة، أفضل مظلات جدة، تركيب برجولات احترافي، مظلات بأسعار منافسة، برجولات ألومنيوم جدة",
  authors: [{ name: "محترفين الديار العالمية" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://aldeyarksa.tech",
    languages: {
      "ar-SA": "https://aldeyarksa.tech",
    },
  },
  openGraph: {
    title: "محترفين الديار العالمية - خدمات شاملة في جدة",
    description: "شركة متخصصة في المظلات، البرجولات، السواتر، وتنسيق الحدائق في جدة",
    url: "https://aldeyarksa.tech",
    siteName: "محترفين الديار العالمية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://aldeyarksa.tech/favicon.svg",
        width: 1200,
        height: 630,
        alt: "محترفين الديار العالمية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "محترفين الديار العالمية",
    description: "خدمات شاملة في المظلات والبرجولات والسواتر في جدة",
    images: ["https://aldeyarksa.tech/favicon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
