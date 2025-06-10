
'use client';

import { useEffect } from 'react';

export default function CompanyJsonLd() {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://aldeyarksa.tech',
      name: 'محترفين الديار العالمية',
      alternateName: 'Aldeyar Global Professionals',
      description: 'الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر وتنسيق الحدائق. خبرة 15 عاماً وضمان شامل.',
      url: 'https://aldeyarksa.tech',
      telephone: '+966555555555',
      email: 'info@aldeyarksa.tech',
      logo: 'https://aldeyarksa.tech/favicon.svg',
      image: 'https://aldeyarksa.tech/images/company-image.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'جدة',
        addressLocality: 'جدة',
        addressRegion: 'مكة المكرمة',
        postalCode: '22233',
        addressCountry: 'SA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.485811,
        longitude: 39.192505
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '16:00',
          closes: '22:00'
        }
      ],
      priceRange: 'SAR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      currenciesAccepted: 'SAR',
      areaServed: {
        '@type': 'City',
        name: 'جدة'
      },
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 21.485811,
          longitude: 39.192505
        },
        geoRadius: '50000'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'خدمات محترفين الديار',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب مظلات السيارات',
              description: 'تركيب مظلات سيارات عالية الجودة مع ضمان شامل'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب البرجولات',
              description: 'تصميم وتركيب برجولات خشبية وحديدية للحدائق'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب السواتر',
              description: 'تركيب سواتر الخصوصية والحماية بتصاميم عصرية'
            }
          }
        ]
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
        bestRating: '5',
        worstRating: '1'
      },
      sameAs: [
        'https://www.facebook.com/aldeyar.jeddah',
        'https://www.instagram.com/aldeyar.jeddah',
        'https://twitter.com/aldeyar_jeddah'
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
