import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Code2,
  Search,
  BrainCircuit,
  Palette,
  Megaphone,
  Newspaper,
  Rocket,
  ShieldAlert,
  FileCheck,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { detailedServices, divisions } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services & Capabilities | KAARYAN LABS — Technology, Research & Growth',
  description:
    'Explore KAARYAN LABS service divisions: Software Development, Research as a Service (RaaS), AI as a Service (AaaS), UI/UX Design, Digital Marketing, Content & Press Services, and Startup Support.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="subpage">
        {/* Header */}
        <header className="page-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="eyebrow">OUR CORE DIVISIONS & CAPABILITIES</p>
            <h1>Research-Driven Services Built to Move Your Business Forward</h1>
            <p className="page-intro">
              From market validation and in-depth business intelligence to custom software engineering,
              practical AI integration, and digital growth marketing, we provide an integrated suite of
              specialized services tailored to your exact stage.
            </p>

            {/* Quick Filter / Jump Navigation */}
            <div className="service-quick-nav">
              <span className="quick-nav-label">Jump to category:</span>
              <div className="quick-nav-links">
                {detailedServices.map((service) => (
                  <a key={service.id} href={`#${service.id}`} className="quick-nav-pill">
                    {service.category}. {service.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Division Summary Banner */}
        <section className="section bg-soft" style={{ padding: '3.5rem 0' }}>
          <div className="container">
            <div className="three-divisions-summary reveal">
              {divisions.map((d) => {
                const Icon = d.icon;
                return (
                  <div className="summary-col" key={d.id}>
                    <div className="summary-header">
                      <span className="badge">{d.number}</span>
                      <Icon size={20} />
                    </div>
                    <h3>{d.title}</h3>
                    <p>{d.short}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Service Categories (A through G) */}
        <section className="section bg-white services-detail-section">
          <div className="container">
            <div className="services-list">
              {detailedServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    id={service.id}
                    key={service.id}
                    className={`service-detail-block reveal ${index % 2 === 1 ? 'alt-bg' : ''}`}
                  >
                    <div className="service-header-strip">
                      <div className="service-category-badge">
                        Category {service.category}
                      </div>
                      <span className="service-block-icon">
                        <Icon size={28} />
                      </span>
                    </div>

                    <div className="service-title-block">
                      <h2>{service.title}</h2>
                      <p className="service-tagline-text">{service.tagline}</p>
                      <p className="service-lead-desc">{service.description}</p>
                    </div>

                    {service.disclaimer && (
                      <div className="service-disclaimer-box">
                        <ShieldAlert size={20} className="disclaimer-icon" />
                        <div>
                          <strong>Editorial & Transparency Policy:</strong>
                          <p>{service.disclaimer}</p>
                        </div>
                      </div>
                    )}

                    <div className="service-content-grid">
                      {/* What We Provide */}
                      <div className="service-column provide-col">
                        <h3>What We Provide</h3>
                        <ul className="check-list">
                          {service.whatWeProvide.map((item) => (
                            <li key={item}>
                              <CheckCircle2 size={16} className="item-icon" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Problems We Help Solve */}
                      <div className="service-column solve-col">
                        <h3>Problems We Help Solve</h3>
                        <ul className="problem-list">
                          {service.problemsSolved.map((item) => (
                            <li key={item}>
                              <AlertCircle size={16} className="problem-icon" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Typical Deliverables */}
                        <div className="deliverables-subblock">
                          <h4>Typical Deliverables</h4>
                          <ul className="deliverable-list">
                            {service.typicalDeliverables.map((item) => (
                              <li key={item}>
                                <FileCheck size={15} className="deliv-icon" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="service-cta-bar">
                      <Link
                        href={`/contact-us?service=${encodeURIComponent(service.title)}`}
                        className="button"
                      >
                        Enquire About {service.title} <ArrowRight size={15} />
                      </Link>
                      <Link href="/our-process" className="button secondary">
                        View Working Process
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global CTA Banner */}
        <section className="section cta-banner">
          <div className="container cta-banner-inner reveal">
            <h2>Need a tailored service combination?</h2>
            <p>
              Many projects span research, design, and software engineering. We gladly tailor scopes
              and milestones to match your business stage and budget.
            </p>
            <div className="cta-banner-buttons">
              <Link href="/contact-us" className="button">
                Schedule a Consultation <ArrowRight size={15} />
              </Link>
              <Link href="/our-process" className="button secondary">
                How We Deliver
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
