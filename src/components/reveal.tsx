'use client';
import { useEffect } from 'react';
import { animate } from 'motion';

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animate(
              entry.target as HTMLElement,
              { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0px)'] },
              { duration: 0.4, ease: 'easeOut' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '200px' }
    );
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
