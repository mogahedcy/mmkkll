
'use client';

import { useEffect, useState } from 'react';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PerformanceOptimizer>
      <div suppressHydrationWarning className={!mounted ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {!mounted ? (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </PerformanceOptimizer>
  );
}
