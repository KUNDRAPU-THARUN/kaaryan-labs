'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollRestoration ensures that navigating between pages always begins at the top
 * of the destination page, while preserving intentional hash anchors (e.g. /services#software-development).
 */
export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // If a hash exists in the URL, verify if it references a valid DOM element
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        // Allow the browser to anchor scroll with scroll-padding-top
        return;
      }
    }

    // Default: Reset scroll position to top on pathname change
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
