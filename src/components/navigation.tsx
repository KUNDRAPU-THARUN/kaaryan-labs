'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { mainNav } from '@/lib/content';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEsc);
    return () => window.removeEventListener('keydown', closeOnEsc);
  }, [open]);

  // Close drawer on path change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header ref={header} className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="container nav" aria-label="Main navigation">
        <Link
          className="brand-link"
          href="/"
          aria-label="KAARYAN LABS home"
          onClick={() => setOpen(false)}
        >
          <Image
            className="brand"
            src="/brand/kaaryan-lockup-v2.webp"
            alt="KAARYAN LABS — From Problem to Possibility"
            width={1800}
            height={486}
            sizes="(max-width: 640px) 180px, 220px"
            quality={100}
            priority
          />
        </Link>

        <div className="desktop-links">
          {mainNav.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'active-link' : ''}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <Link className="button nav-cta" href="/contact-us">
          Start a Project <ArrowRight size={15} />
        </Link>

        <button
          ref={trigger}
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {open && (
          <div id="mobile-nav" className="mobile-links">
            {mainNav.map(({ label, href }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              className="button mobile-cta"
              href="/contact-us"
              onClick={() => setOpen(false)}
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
