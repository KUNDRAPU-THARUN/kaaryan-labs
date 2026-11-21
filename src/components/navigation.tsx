'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navigation } from '@/lib/content';
export function Navigation({ page = 'home' }: { page?: 'home' | 'story' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(page === 'story' ? '#about' : '#home');
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const destination = useRef<string | null>(null);
  const sectionHref = (href: string) => page === 'story' ? `/${href}` : href;
  const navigate = useCallback((href: string) => { destination.current = href; setActive(href); setOpen(false); }, []);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 16);
      if (page === 'story') { setActive('#about'); return; }
      if (destination.current) { setActive(destination.current); return; }
      let current = '#home';
      for (const [, href] of navigation) {
        const section = document.querySelector(href);
        if (section && section.getBoundingClientRect().top <= 150) current = href;
      }
      if (window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = '#contact';
      setActive(current);
    };
    update(); window.addEventListener('scroll', update, { passive: true });
    const manualScroll = () => { destination.current = null; update(); };
    const scrollKey = (event: KeyboardEvent) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) manualScroll(); };
    const hashChange = () => { if (navigation.some(([, href]) => href === window.location.hash)) navigate(window.location.hash); };
    window.addEventListener('wheel', manualScroll, { passive: true });
    window.addEventListener('touchstart', manualScroll, { passive: true });
    window.addEventListener('keydown', scrollKey);
    window.addEventListener('hashchange', hashChange);
    const outside = (event: PointerEvent) => { if (header.current && !header.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('scroll', update); document.removeEventListener('pointerdown', outside); window.removeEventListener('wheel', manualScroll); window.removeEventListener('touchstart', manualScroll); window.removeEventListener('keydown', scrollKey); window.removeEventListener('hashchange', hashChange); };
  }, [navigate, page]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header ref={header} className={`header ${scrolled ? 'scrolled' : ''}`}><nav className="container nav" aria-label="Main navigation">
    <a className="brand-link" href={sectionHref('#home')} aria-label="Kaaryan Labs home" onClick={() => setOpen(false)}><Image className="brand" src="/brand/kaaryan-lockup-v2.webp" alt="KAARYAN LABS — From Problem to Possibility" width={1800} height={486} quality={100} preload/></a>
    <div className="desktop-links">{navigation.map(([label, href]) => <a key={href} href={sectionHref(href)} onClick={() => page === 'home' ? navigate(href) : setOpen(false)} aria-current={(page === 'story' ? href === '#about' : active === href) ? 'location' : undefined}>{label}</a>)}</div>
    <a className="button nav-cta" href={sectionHref('#contact')}>Start a Project <ArrowRight size={15}/></a>
    <button ref={trigger} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    {open && <div id="mobile-nav" className="mobile-links">{navigation.map(([label, href]) => <a key={href} href={sectionHref(href)} aria-current={(page === 'story' ? href === '#about' : active === href) ? 'location' : undefined} onClick={() => page === 'home' ? navigate(href) : setOpen(false)}>{label}</a>)}<a className="button" href={sectionHref('#contact')} onClick={() => setOpen(false)}>Start a Project <ArrowRight size={16}/></a></div>}
  </nav></header>;
}
