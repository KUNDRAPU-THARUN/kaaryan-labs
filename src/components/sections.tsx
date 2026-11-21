import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, BrainCircuit, Orbit, Sparkles, Box, Layers3, Globe2, Smartphone, Cloud, Database } from 'lucide-react';
import { navigation, principles, services, steps } from '@/lib/content';
import { ContactForm } from './contact-form';

export function Hero() {
  return <section id="home" className="hero"><div className="hero-art"><Image src="/images/brand-architecture.png" alt="Bright reception with the KAARYAN LABS wall logo, mountain views, and natural light" fill sizes="(max-width: 640px) 100vw, 56vw" quality={100} preload/><div className="hero-art-fade"/></div>
    <div className="container hero-inner"><div className="hero-copy"><p className="hero-eyebrow">RESEARCH-DRIVEN SOFTWARE COMPANY</p><h1>FROM PROBLEM<br/>TO <span>POSSIBILITY</span></h1><p className="hero-description">Kaaryan Labs is a research-driven software products and solutions company. We turn complex problems into elegant, scalable digital solutions that create real-world impact.</p><div className="actions"><a className="button" href="#contact">Start a Project <ArrowRight size={15}/></a><a className="button secondary" href="#about"><Play size={13} fill="currentColor"/> Learn More</a></div><div className="positioning"><div><strong>Research-first</strong><span>Understanding before building</span></div><div><strong>Software-focused</strong><span>Purposeful digital solutions</span></div><div><strong>Two core divisions</strong><span>Products & custom solutions</span></div></div></div></div></section>;
}
export function TrustStrip() {
  const capabilities = [[Globe2, 'WEB APPLICATIONS'], [Smartphone, 'MOBILE SOFTWARE'], [BrainCircuit, 'AI SOLUTIONS'], [Cloud, 'SAAS PRODUCTS'], [Database, 'CUSTOM PLATFORMS']] as const;
  return <section className="trust-strip" aria-label="Our approach"><div className="container"><p>BUILT FOR VISIONARIES, BUILDERS AND FORWARD-THINKING TEAMS</p><div className="capabilities">{capabilities.map(([Icon, title]) => <span key={title}><Icon aria-hidden="true" size={22}/>{title}</span>)}</div></div></section>;
}
export function About() {
  const values = [{ icon: BrainCircuit, title: 'Research-First Mindset', text: 'We go deep to understand real problems' }, { icon: Orbit, title: 'End-to-End Product Thinking', text: 'From strategy to scalable solutions' }, { icon: Sparkles, title: 'Impact-Focused Engineering', text: 'Building for lasting, real-world value' }];
  return <section id="about" className="about section"><div className="container about-grid reveal"><div className="about-copy"><p className="eyebrow">ABOUT KAARYAN LABS</p><h2>A Research-Driven<br/>Product Engineering Company</h2><p>We combine deep research, engineering excellence, and product thinking to build software solutions that solve meaningful problems. From idea to scalable implementation, we aim to turn real-world challenges into practical digital solutions.</p><Link className="button compact" href="/our-story">Our Story <ArrowRight size={14}/></Link></div><figure className="studio"><Image src="/images/studio-concept.png" alt="KAARYAN LABS studio with glass partitions, mountain-view windows, and the wall logo" width={1536} height={1024} sizes="(max-width: 640px) 90vw, 25vw" quality={100}/><figcaption>Brand environment concept</figcaption></figure><div className="about-values">{values.map(({ icon: Icon, title, text }) => <div className="about-value" key={title}><span className="round-icon"><Icon size={24}/></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>;
}
function Geometry({ variant }: { variant: 'products' | 'solutions' }) {
  const id = `geometry-${variant}`;
  return <div className={`geometry ${variant}`} aria-hidden="true"><svg viewBox="0 0 420 340" preserveAspectRatio="xMidYMid slice" focusable="false">
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".95"/><stop offset="1" stopColor="#b7d5f6" stopOpacity=".72"/></linearGradient>
      <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eaf5ff"/><stop offset=".52" stopColor="#8eb5e4"/><stop offset="1" stopColor="#31547f"/></linearGradient>
      <linearGradient id={`${id}-deep`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#809fc4"/><stop offset="1" stopColor="#213957"/></linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="170%" height="180%"><feGaussianBlur in="SourceAlpha" stdDeviation="10"/><feOffset dy="12"/><feComponentTransfer><feFuncA type="linear" slope=".16"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="#7496be" opacity=".24"/></pattern>
    </defs>
    <path d="M165 14h255v326H98z" fill={`url(#${id}-dots)`}/>
    <circle cx="330" cy="82" r="128" fill="#d9eaff" opacity=".42"/>
    {variant === 'products' ? <>
      <path d="M165 270 292 196l100 58-126 76z" fill="#b5d0ef" opacity=".42"/>
      <g filter={`url(#${id}-shadow)`} transform="rotate(-7 278 157)">
        <rect x="133" y="65" width="237" height="176" rx="18" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="3"/>
        <rect x="150" y="82" width="203" height="143" rx="11" fill="#f9fcff" stroke="#dce9f7"/>
        <circle cx="165" cy="97" r="3" fill="#8fb1d8"/><circle cx="176" cy="97" r="3" fill="#bdd0e6"/><circle cx="187" cy="97" r="3" fill="#d9e5f2"/>
        <rect x="160" y="113" width="58" height="99" rx="7" fill="#edf5fd"/>
        <rect x="169" y="124" width="35" height="5" rx="2.5" fill="#8cadd4"/><rect x="169" y="137" width="28" height="4" rx="2" fill="#c2d5eb"/><rect x="169" y="149" width="34" height="4" rx="2" fill="#c2d5eb"/>
        <rect x="228" y="113" width="111" height="42" rx="7" fill="#fff" stroke="#e2edf8"/>
        <path d="M239 143 253 132l12 6 13-14 12 8 18-12 20 9" fill="none" stroke="#4886cb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="228" y="164" width="49" height="48" rx="7" fill="#fff" stroke="#e2edf8"/><rect x="286" y="164" width="53" height="48" rx="7" fill="#fff" stroke="#e2edf8"/>
        <path d="M239 198v-14m10 14v-23m10 23v-10m36 0h29m-29 9h21" stroke="#74a1d5" strokeWidth="5" strokeLinecap="round"/>
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <rect x="276" y="230" width="74" height="62" rx="14" fill={`url(#${id}-blue)`} stroke="#fff" strokeWidth="2"/>
        <path d="M295 261h36m-18-18v36" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".88"/>
      </g>
    </> : <>
      <path d="M115 218 215 160l91 53-100 59z" fill="#dceafb" opacity=".76"/>
      <path d="m206 272 100-59v87l-100 58z" fill={`url(#${id}-deep)`} opacity=".92"/>
      <path d="m115 218 91 54v86l-91-54z" fill={`url(#${id}-blue)`} opacity=".92"/>
      <path d="m115 218 100-58 91 53-100 59z" fill={`url(#${id}-glass)`} stroke="#fff" strokeWidth="2"/>
      <path d="M154 218 215 183l55 32-61 35z" fill="#fff" opacity=".9"/>
      <path d="m154 218 55 32v49l-55-32z" fill="#d9eafa" opacity=".95"/>
      <path d="m209 250 61-35v49l-61 35z" fill="#6f94bd" opacity=".88"/>
      <path d="m205 127 43-25 38 22-43 26z" fill="#fff" stroke="#c7dbf1" strokeWidth="2"/>
      <path d="m205 127 38 23v42l-38-22z" fill="#b9d3ef"/><path d="m243 150 43-26v42l-43 26z" fill="#698db7"/>
      <path d="M98 172 153 140m151 6 43-25m-39 156 55 32" fill="none" stroke="#79a2d0" strokeWidth="2" strokeDasharray="5 7"/>
      <circle cx="98" cy="172" r="7" fill="#fff" stroke="#75a0d0" strokeWidth="3"/><circle cx="347" cy="121" r="7" fill="#fff" stroke="#75a0d0" strokeWidth="3"/><circle cx="363" cy="309" r="7" fill="#fff" stroke="#75a0d0" strokeWidth="3"/>
      <g filter={`url(#${id}-shadow)`}><rect x="272" y="56" width="83" height="50" rx="13" fill="#fff" stroke="#dce9f7"/><circle cx="294" cy="81" r="8" fill="#5c8ec4"/><path d="M312 75h27m-27 12h20" stroke="#b2c9e3" strokeWidth="5" strokeLinecap="round"/></g>
    </>}
  </svg></div>;
}
export function Divisions() {
  return <section id="divisions" className="section divisions"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow">OUR DIVISIONS</p><h2>Two Focus Areas. One Mission.</h2></div><p>We work across products and solutions to help businesses<br className="desktop-break"/> innovate, scale and create meaningful impact.</p></div><div className="division-grid"><a className="division-card reveal" href="#contact"><span className="round-icon"><Box size={30}/></span><div className="division-copy"><h3>Software Products</h3><p>Building original, research-backed software products<br className="desktop-break"/> that solve real-world problems at scale.</p></div><Geometry variant="products"/><span className="circle-arrow"><ArrowRight size={18}/></span><span className="sr-only">Discuss proprietary software products</span></a><a className="division-card reveal" href="#contact"><span className="round-icon"><Layers3 size={30}/></span><div className="division-copy"><h3>Software Solutions</h3><p>Custom software, platforms, and digital solutions<br className="desktop-break"/> tailored to unique business requirements.</p></div><Geometry variant="solutions"/><span className="circle-arrow"><ArrowRight size={18}/></span><span className="sr-only">Discuss custom software solutions</span></a></div></div></section>;
}
export function Expertise() {
  return <section id="expertise" className="section expertise"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow">OUR EXPERTISE</p><h2>Modern Technology. Meaningful Impact.</h2></div><p>We use modern software technologies and thoughtful engineering practices to build reliable, scalable, and user-centered solutions.</p></div><div className="expertise-grid reveal">{services.map(({ icon: Icon, title, description }) => <a className="expertise-item" key={title} href="#contact"><span className="service-icon"><Icon size={28}/></span><h3>{title}</h3><p>{description}</p><ArrowRight className="service-arrow" size={19}/></a>)}</div></div></section>;
}
export function Workflow() {
  return <section id="process" className="section workflow"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow">OUR RESEARCH-LED WORKFLOW</p><h2>From Insight to Impact</h2></div><p>A structured, research-driven process to turn complex<br className="desktop-break"/> problems into scalable solutions.</p></div><ol className="workflow-grid">{steps.map(({ icon: Icon, title, description }, index) => <li className="workflow-card reveal" key={title}><span className="round-icon"><Icon size={23}/></span><div><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>{index < steps.length - 1 && <ArrowRight className="step-arrow" size={18}/>}</li>)}</ol></div></section>;
}
export function Principles() {
  return <section id="insights" className="section principles-section"><div className="container principles-layout"><div className="reveal"><p className="eyebrow">OUR PRINCIPLES</p><h2>What Drives Us</h2></div><div className="principles-grid">{principles.map(({ icon: Icon, title, description }) => <article className="principle-card reveal" key={title}><span className="round-icon"><Icon size={23}/></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>;
}
export function Contact({ configured }: { configured: boolean }) {
  return <section id="contact" className="section contact"><div className="container contact-grid"><div className="contact-copy reveal"><p className="eyebrow">LET’S BUILD TOGETHER</p><h2>Have a problem worth solving?</h2><p>Whether you’re exploring a new idea, need a software development partner, or want to build something impactful, we’d love to hear from you.</p></div><ContactForm configured={configured}/></div></section>;
}
export function Footer({ page = 'home' }: { page?: 'home' | 'story' }) {
  const sectionHref = (href: string) => page === 'story' ? `/${href}` : href;
  return <footer className="footer"><div className="container"><div className="footer-top"><a className="footer-brand" href={sectionHref('#home')} aria-label="Kaaryan Labs home"><Image src="/brand/kaaryan-lockup-v2.webp" alt="KAARYAN LABS — From Problem to Possibility" width={1800} height={486} quality={100}/></a><div className="footer-navigation"><h3>Navigation</h3><div>{navigation.map(([title, href]) => <a key={href} href={sectionHref(href)}>{title}</a>)}</div></div><div className="footer-purpose"><p>FROM PROBLEM TO POSSIBILITY</p><span>Research-driven software products and solutions<br/>for a better tomorrow.</span></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} KAARYAN LABS. All rights reserved.</p><span>RESEARCH. BUILD. IMPROVE.</span><a href={sectionHref('#home')}>Back to top ↑</a></div></div></footer>;
}
