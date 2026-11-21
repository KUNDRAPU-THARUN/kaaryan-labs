import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Rocket,
  Search,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
  Layout,
  Code2,
  TrendingUp,
  FileText,
  BarChart3,
  Presentation,
  Compass,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { COMPANY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Startup & Founder Support | KAARYAN LABS — Idea Validation to MVP Launch',
  description:
    'Dedicated support for startup founders: idea research, market surveys, competitor mapping, pitch deck design, clickable prototypes, MVP development, and launch strategy.',
  alternates: { canonical: '/startup-support' },
};

const founderJourney = [
  {
    phase: 'Phase 01',
    title: 'Idea Discovery & Problem Framing',
    description: 'We help founders articulate the acute pain point, target user demographics, and value proposition with clarity.',
    icon: Lightbulb,
    deliverables: ['Problem statement framing', 'Initial assumption mapping', 'Target user definition'],
  },
  {
    phase: 'Phase 02',
    title: 'Idea Research & Market Validation',
    description: 'Empirical market research, direct and indirect competitor analysis, and customer surveys to ensure genuine market demand.',
    icon: Search,
    deliverables: ['Competitor benchmarking matrix', 'Survey design & data synthesis', 'Market opportunity report'],
  },
  {
    phase: 'Phase 03',
    title: 'Feasibility & Strategy Recommendations',
    description: 'Technical feasibility analysis, API and infrastructure constraints, and business model monetization recommendations.',
    icon: Compass,
    deliverables: ['Technical feasibility dossier', 'Business model options', 'Risk mitigation roadmap'],
  },
  {
    phase: 'Phase 04',
    title: 'Brand Identity & Pitch Deck Preparation',
    description: 'Visual identity system, logo design, investor-ready pitch decks, and executive storytelling to present your vision professionally.',
    icon: Presentation,
    deliverables: ['Investor pitch deck (PDF & Figma)', 'Executive one-pager', 'Brand kit & visual guidelines'],
  },
  {
    phase: 'Phase 05',
    title: 'Clickable Prototypes & Usability Testing',
    description: 'Interactive high-fidelity prototypes in Figma to simulate complete user flows and gather early user feedback before coding.',
    icon: Layout,
    deliverables: ['Clickable mobile/web prototype', 'User testing feedback notes', 'Refined UX wireframes'],
  },
  {
    phase: 'Phase 06',
    title: 'Minimum Viable Product (MVP) Engineering',
    description: 'Fast, disciplined engineering of the core feature set using scalable technologies (Next.js, React, Node.js, Cloudflare/AWS).',
    icon: Code2,
    deliverables: ['Fully functional, tested web or mobile MVP', 'Production cloud deployment & SSL', 'Complete source code repository'],
  },
  {
    phase: 'Phase 07',
    title: 'Launch, Press & Early Traction Support',
    description: 'Launch coordination, announcement press releases, technical articles, and Meta Ads / organic digital marketing campaigns.',
    icon: Rocket,
    deliverables: ['Announcement press release draft', 'Launch campaign setup', 'SEO foundation & analytics'],
  },
];

export default function StartupSupportPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="subpage">
        {/* Page Hero */}
        <header className="page-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Startup Support</span>
            </nav>
            <p className="eyebrow">DEDICATED FOUNDER PARTNERSHIP</p>
            <h1>From Concept to Market Traction: The Founder’s Innovation Engine</h1>
            <p className="page-intro">
              Building a technology startup is an ambitious journey fraught with uncertainty.
              KAARYAN LABS acts as your research and technical co-driver—providing structured market research,
              compelling UI/UX design, clickable prototypes, and rapid MVP engineering.
            </p>
            <div className="page-header-cta" style={{ marginTop: '1.5rem' }}>
              <Link
                href="/contact-us?service=Startup%20Support"
                className="button"
              >
                Discuss Your Startup Idea <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </header>

        {/* Essential Transparency Banner */}
        <section className="section bg-soft" style={{ padding: '2.5rem 0' }}>
          <div className="container">
            <div className="disclaimer-banner reveal">
              <ShieldAlert size={24} className="disclaimer-icon-lg" />
              <div>
                <h3>Transparent Partnership Policy</h3>
                <p>
                  We are a technology, research, and design partner. <strong>We do not guarantee funding, investor acceptance, or commercial success.</strong>{' '}
                  Our mission is to help you build the strongest, most validated, and highest-quality foundation possible so your startup has the best chance to succeed.
                  Every service can be chosen independently or combined based on your stage and budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Complete Founder Journey */}
        <section className="section bg-white">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">THE 7-PHASE FOUNDER JOURNEY</p>
                <h2>A Step-by-Step Path from Vision to Live Product</h2>
              </div>
              <p>Choose only the support you need, or partner with us across the entire launch journey.</p>
            </div>

            <div className="journey-grid">
              {founderJourney.map((step) => {
                const Icon = step.icon;
                return (
                  <div className="journey-card reveal" key={step.phase}>
                    <div className="journey-header">
                      <span className="phase-pill">{step.phase}</span>
                      <span className="round-icon">
                        <Icon size={22} />
                      </span>
                    </div>

                    <h3>{step.title}</h3>
                    <p className="journey-desc">{step.description}</p>

                    <div className="journey-deliverables">
                      <strong>Key Deliverables:</strong>
                      <ul>
                        {step.deliverables.map((d) => (
                          <li key={d}>
                            <CheckCircle2 size={14} /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flexible Engagement Models */}
        <section className="section bg-soft">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">FLEXIBLE ENGAGEMENT</p>
                <h2>Built Around Your Stage and Runway</h2>
              </div>
              <p>Every startup is unique. We adapt to your timeline, resources, and specific requirements.</p>
            </div>

            <div className="engagement-grid reveal">
              <div className="engagement-card">
                <h3>Early Idea / Pre-Seed</h3>
                <p className="engagement-focus">Validate before investing capital</p>
                <ul>
                  <li><CheckCircle2 size={15} /> Problem framing & target user surveys</li>
                  <li><CheckCircle2 size={15} /> Competitor intelligence report</li>
                  <li><CheckCircle2 size={15} /> Pitch deck structure & design</li>
                  <li><CheckCircle2 size={15} /> Clickable Figma prototype for customer demos</li>
                </ul>
                <Link
                  href="/contact-us?service=Startup%20Support"
                  className="button secondary compact"
                >
                  Explore Early-Stage Support
                </Link>
              </div>

              <div className="engagement-card highlighted">
                <span className="highlight-tag">Most Popular</span>
                <h3>MVP Engineering & Launch</h3>
                <p className="engagement-focus">Go from prototype to live production software</p>
                <ul>
                  <li><CheckCircle2 size={15} /> Architecture planning & API design</li>
                  <li><CheckCircle2 size={15} /> Full-stack Next.js / Mobile MVP build</li>
                  <li><CheckCircle2 size={15} /> Cloud hosting setup, domain & SSL</li>
                  <li><CheckCircle2 size={15} /> Launch press release & announcement drafting</li>
                </ul>
                <Link
                  href="/contact-us?service=Startup%20Support"
                  className="button compact"
                >
                  Build Your MVP
                </Link>
              </div>

              <div className="engagement-card">
                <h3>Growth & Traction Stage</h3>
                <p className="engagement-focus">Iterate, optimize, and expand market reach</p>
                <ul>
                  <li><CheckCircle2 size={15} /> Feature enhancements & performance tuning</li>
                  <li><CheckCircle2 size={15} /> Targeted Meta Ads & SEO strategies</li>
                  <li><CheckCircle2 size={15} /> Technical writing & industry articles</li>
                  <li><CheckCircle2 size={15} /> Ongoing maintenance SLA</li>
                </ul>
                <Link
                  href="/contact-us?service=Startup%20Support"
                  className="button secondary compact"
                >
                  Scale Your Startup
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="section cta-banner">
          <div className="container cta-banner-inner reveal">
            <h2>Have a Startup Idea? Let’s Explore It Together.</h2>
            <p>
              Share your concept in confidence. We will review your requirements, discuss the feasibility,
              and help you plan the most pragmatic roadmap to validation and launch.
            </p>
            <div className="cta-banner-buttons">
              <Link
                href="/contact-us?service=Startup%20Support"
                className="button"
              >
                Start Founder Conversation <ArrowRight size={15} />
              </Link>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
              >
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
