
'use client';

import { useEffect } from 'react';

export default function MobileOptimizer() {
  useEffect(() => {
    // تحسين الأداء للموبايل
    const optimizeMobile = () => {
      // تقليل animations على الموبايل
      if (window.innerWidth < 768) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
      }

      // lazy loading للصور بعد scroll
      const images = document.querySelectorAll('img[data-src]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => observer.observe(img));

      // تحسين الخطوط
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }
    };

    optimizeMobile();
    window.addEventListener('resize', optimizeMobile);

    return () => {
      window.removeEventListener('resize', optimizeMobile);
    };
  }, []);

  return null;
}
