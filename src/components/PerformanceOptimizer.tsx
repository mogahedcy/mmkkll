
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Image cache management
class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private loadingSet = new Set<string>();

  async preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    if (this.loadingSet.has(src)) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src)!);
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
      });
    }

    this.loadingSet.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingSet.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingSet.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(urls.map(url => this.preloadImage(url)));
  }

  clearCache(): void {
    this.cache.clear();
    this.loadingSet.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Global image cache instance
export const imageCache = new ImageCache();

// Performance monitoring
class PerformanceMonitor {
  private metrics = {
    navigationStart: 0,
    loadComplete: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  };

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics() {
    // Navigation timing
    if (typeof window !== 'undefined') {
      this.metrics.navigationStart = performance.timeOrigin;

      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            this.metrics.cumulativeLayoutShift += (entry as any).value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
        }
      }).observe({ entryTypes: ['first-input'] });

      // Load complete
      window.addEventListener('load', () => {
        this.metrics.loadComplete = performance.now();
      });
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  logMetrics() {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log('First Contentful Paint:', this.metrics.firstContentfulPaint.toFixed(2), 'ms');
      console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint.toFixed(2), 'ms');
      console.log('Cumulative Layout Shift:', this.metrics.cumulativeLayoutShift.toFixed(4));
      console.log('First Input Delay:', this.metrics.firstInputDelay.toFixed(2), 'ms');
      console.log('Load Complete:', this.metrics.loadComplete.toFixed(2), 'ms');
      console.log('Image Cache Size:', imageCache.getCacheSize());
      console.groupEnd();
    }
  }
}

// Memory management
class MemoryManager {
  private cleanup: (() => void)[] = [];

  addCleanup(fn: () => void) {
    this.cleanup.push(fn);
  }

  performCleanup() {
    this.cleanup.forEach(fn => fn());
    this.cleanup = [];
  }

  monitorMemory() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize / 1048576; // MB
      const total = memory.totalJSHeapSize / 1048576; // MB
      const limit = memory.jsHeapSizeLimit / 1048576; // MB

      if (process.env.NODE_ENV === 'development') {
        console.log(`Memory: ${used.toFixed(2)}MB / ${total.toFixed(2)}MB (Limit: ${limit.toFixed(2)}MB)`);
      }

      // Auto cleanup if memory usage is high
      if (used / limit > 0.8) {
        this.performCleanup();
        imageCache.clearCache();
      }
    }
  }
}

// Global instances
export const performanceMonitor = new PerformanceMonitor();
export const memoryManager = new MemoryManager();

// Resource preloader
export const preloadCriticalResources = (resources: string[]) => {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';

    if (resource.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      link.as = 'image';
      imageCache.preloadImage(resource);
    } else if (resource.match(/\.(woff|woff2|ttf|otf)$/i)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (resource.match(/\.css$/i)) {
      link.as = 'style';
    } else if (resource.match(/\.js$/i)) {
      link.as = 'script';
    }

    link.href = resource;
    document.head.appendChild(link);
  });
};

// Virtualization helper for large lists
export const useVirtualization = (items: any[], containerHeight: number, itemHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    setContainerRef
  };
};

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const router = useRouter();

  useEffect(() => {
    // تحسين التمرير
    const handleScroll = () => {
      requestAnimationFrame(() => {
        // أي منطق تمرير إضافي
      });
    };

    // تحسين تحميل الصور
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'lazy';
        }
      });
    }

    // تحسين الخطوط
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }

    // Preload critical resources
    const criticalImages = [
      '/favicon.svg',
      '/favicon-16x16.png',
      '/favicon-32x32.png'
    ];

    preloadCriticalResources(criticalImages);

    // Monitor performance
    const interval = setInterval(() => {
      memoryManager.monitorMemory();
    }, 30000); // Check every 30 seconds

    // Log performance metrics after page load
    const timeout = setTimeout(() => {
      performanceMonitor.logMetrics();
      
      // إضافة تتبع Core Web Vitals
      if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
        });
      }
    }, 3000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearTimeout(timeout);
      memoryManager.performCleanup();
    };
  }, []);

  // Route change optimization
  useEffect(() => {
    const handleRouteChange = () => {
      // Clear old image cache on route change to prevent memory leaks
      setTimeout(() => {
        memoryManager.performCleanup();
      }, 1000);
    };

    return () => {
      memoryManager.performCleanup();
    };
  }, [router]);

  return <>{children}</>;
}
