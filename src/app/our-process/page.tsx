import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  FileSearch,
  Lightbulb,
  CheckCircle2,
  Layout,
  Code2,
  ShieldCheck,
  Rocket,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { processSteps } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Process | KAARYAN LABS — Disciplined 9-Step Engineering Workflow',
  description:
    'Discover our structured 9-step research-driven process: Discover, Research, Recommend, Client Approval, Design, Develop, Test, Launch, and Improve.',
  alternates: { canonical: '/our-process' },
};

export default function OurProcessPage() {
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
              <span aria-current="page">Our Process</span>
            </nav>
            <p className="eyebrow">A RESEARCH-FIRST METHODOLOGY</p>
            <h1>Our 9-Step Research & Development Workflow</h1>
            <p className="page-intro">
              Great software and innovation initiatives fail when they jump to conclusions.
              Our structured nine-step workflow ensures every decision is validated by research,
              aligned with your business objectives, and engineered to production quality.
            </p>
          </div>
        </header>

        {/* Process Timeline Section */}
        <section className="section bg-white">
          <div className="container">
            <div className="process-timeline">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div className="timeline-item reveal" key={step.step}>
                    <div className="timeline-marker">
                      <span className="step-circle">{step.step}</span>
                      {index < processSteps.length - 1 && <span className="timeline-line" />}
                    </div>

                    <div className="timeline-card">
                      <div className="timeline-card-header">
                        <div className="timeline-title-area">
                          <span className="timeline-badge">Stage {step.step}</span>
                          <h2>{step.name}</h2>
                          <p className="timeline-tagline">{step.tagline}</p>
                        </div>
                        <span className="round-icon timeline-icon">
                          <Icon size={26} />
                        </span>
                      </div>

                      <p className="timeline-description">{step.description}</p>

                      <div className="timeline-deep-dive">
                        <strong>Why this matters:</strong>
                        <p>{step.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Working Principles */}
        <section className="section bg-soft">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">COLLABORATION PRINCIPLES</p>
                <h2>What You Can Expect Working With Us</h2>
              </div>
              <p>Transparency, clear communication, and measurable progress at every milestone.</p>
            </div>

            <div className="collaboration-grid reveal">
              <div className="collab-box">
                <span className="round-icon">
                  <CheckCircle2 size={24} />
                </span>
                <h3>Direct Alignment</h3>
                <p>No layers of non-technical managers. You collaborate directly with practitioners who understand your requirements.</p>
              </div>

              <div className="collab-box">
                <span className="round-icon">
                  <ShieldCheck size={24} />
                </span>
                <h3>Zero Ambiguity</h3>
                <p>Deliverables, architecture diagrams, and milestones are approved in advance before entering subsequent phases.</p>
              </div>

              <div className="collab-box">
                <span className="round-icon">
                  <ChartNoAxesColumnIncreasing size={24} />
                </span>
                <h3>Post-Launch Commitment</h3>
                <p>We do not disappear after deployment. We support your platform with monitoring, performance fixes, and proactive iterations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section cta-banner">
          <div className="container cta-banner-inner reveal">
            <h2>Ready to start Step 1: Discover?</h2>
            <p>Tell us about your problem, and let’s schedule a discovery call to research the possibilities.</p>
            <div className="cta-banner-buttons">
              <Link href="/contact-us" className="button">
                Begin Discovery Call <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="button secondary">
                Explore Services
              </Link>
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
