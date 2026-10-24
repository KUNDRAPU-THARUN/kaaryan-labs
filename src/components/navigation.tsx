'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation } from '@/lib/content';
export function Navigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="header"><nav className="container nav" aria-label="Main navigation">
    <a href="#home" aria-label="Kaaryan Labs home" onClick={() => setOpen(false)}><Image className="brand" src="/brand/kaaryan-logo-horizontal.jpeg" alt="Kaaryan Labs" width={210} height={70} priority /></a>
    <div className="desktop-links">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
    <a className="button small nav-cta" href="#contact">Start a Project <ArrowUpRight size={15}/></a>
    <button ref={trigger} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    {open && <div id="mobile-nav" className="mobile-links">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="#contact" onClick={() => setOpen(false)}>Start a Project ↗</a></div>}
  </nav></header>;
}
