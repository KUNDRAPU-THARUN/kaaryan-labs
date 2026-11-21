import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  Compass,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers3,
  Rocket,
  Lightbulb,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { COMPANY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us | KAARYAN LABS — Research-Driven Technology & Innovation Partner',
  description:
    'Learn about KAARYAN LABS, our research-driven philosophy, mission, vision, and disciplined approach to engineering digital solutions and supporting business innovation.',
  alternates: { canonical: '/about-us' },
};

export default function AboutUsPage() {
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
              <span aria-current="page">About Us</span>
            </nav>
            <p className="eyebrow">ABOUT KAARYAN LABS</p>
            <h1>A Research-Driven Technology & Business Innovation Partner</h1>
            <p className="page-intro">
              We bridge the gap between complex problems and practical, scalable solutions.
              By placing deep research, user understanding, and disciplined engineering at the core of our work,
              we help forward-thinking organizations build software and strategies that make a lasting impact.
            </p>
          </div>
        </header>

        {/* Who We Are & Studio Concept */}
        <section className="section bg-white">
          <div className="container about-overview-grid reveal">
            <div className="about-overview-text">
              <span className="badge">WHO WE ARE</span>
              <h2>Transforming Ideas Into Practical Digital Reality</h2>
              <p>
                <strong>KAARYAN LABS</strong> is a research-driven technology and business innovation company.
                We partner with businesses, entrepreneurs, and visionary teams to turn challenges into opportunity.
              </p>
              <p>
                In an era where technology is frequently adopted for its own sake, we stand for purposeful execution.
                We believe that software should solve genuine business bottlenecks, improve human workflows, and create
                measurable value.
              </p>
              <p>
                Our core strength lies in combining empirical research with modern product engineering,
                creative design, and data-backed digital marketing.
              </p>
              <div className="about-action-row">
                <Link href="/our-story" className="button secondary compact">
                  Read Our Founding Purpose & Story <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <figure className="studio-card">
              <Image
                src="/images/studio-concept.png"
                alt="KAARYAN LABS studio environment concept with natural lighting and wall brand identity"
                width={1536}
                height={1024}
                className="studio-img"
                quality={100}
              />
              <figcaption>KAARYAN LABS Design & Technology Studio Concept</figcaption>
            </figure>
          </div>
        </section>

        {/* Mission, Vision, Philosophy */}
        <section className="section bg-soft">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">OUR CORE FOUNDATION</p>
                <h2>Mission, Vision & Core Philosophy</h2>
              </div>
              <p>The guiding principles behind every project, research initiative, and software architecture we build.</p>
            </div>

            <div className="foundation-cards reveal">
              <div className="foundation-card">
                <span className="foundation-icon">
                  <Target size={28} />
                </span>
                <h3>Our Mission</h3>
                <p>
                  To help businesses and founders transform problems and ideas into practical, reliable,
                  and scalable digital solutions through disciplined research, technology, and continuous innovation.
                </p>
              </div>

              <div className="foundation-card">
                <span className="foundation-icon">
                  <Compass size={28} />
                </span>
                <h3>Our Vision</h3>
                <p>
                  To build meaningful digital solutions and become a globally trusted technology and
                  innovation partner for forward-looking enterprises and entrepreneurs.
                </p>
              </div>

              <div className="foundation-card">
                <span className="foundation-icon">
                  <Lightbulb size={28} />
                </span>
                <h3>Our Philosophy</h3>
                <p>
                  We firmly believe that successful solutions begin with understanding the actual problem.
                  When you understand the root cause rather than superficial symptoms, you design software that users love
                  and rely upon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="section bg-white">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">OUR WORKING APPROACH</p>
                <h2>How We Work With You</h2>
              </div>
              <p>A structured, methodical approach that eliminates guesswork and ensures consistent project success.</p>
            </div>

            <div className="approach-grid reveal">
              <div className="approach-item">
                <div className="approach-num">01</div>
                <h3>Research Before Recommendations</h3>
                <p>
                  We never make technology or product assumptions. We listen to your stakeholders, analyze target user needs,
                  and study competitor landscapes to identify what is genuinely worth building.
                </p>
              </div>

              <div className="approach-item">
                <div className="approach-num">02</div>
                <h3>Planning Before Development</h3>
                <p>
                  Before writing code, we architect system data models, map interactive user journeys, create clickable wireframes,
                  and agree on clear milestone deliverables.
                </p>
              </div>

              <div className="approach-item">
                <div className="approach-num">03</div>
                <h3>Continuous Improvement After Implementation</h3>
                <p>
                  Software is a living product. Following deployment, we gather real-world user metrics, test performance, and provide
                  reliable maintenance and strategic iterations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section cta-banner">
          <div className="container cta-banner-inner reveal">
            <h2>Ready to transform your problem into a possibility?</h2>
            <p>Let’s discuss your vision, review your business requirements, and explore how we can support your growth.</p>
            <div className="cta-banner-buttons">
              <Link href="/contact-us" className="button">
                Start a Project Discussion <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="button secondary">
                View All Capabilities
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
