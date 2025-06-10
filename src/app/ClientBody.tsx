
'use client';

import { useEffect, useState } from 'react';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تجنب مشكلة hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white" suppressHydrationWarning>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <PerformanceOptimizer>
      <div suppressHydrationWarning>
        {children}
      </div>
    </PerformanceOptimizer>
  );
}
