import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Orbit,
  Sparkles,
  Globe2,
  Smartphone,
  Cloud,
  Database,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Layers3,
  Rocket,
  Code2,
  TrendingUp,
} from 'lucide-react';
import {
  COMPANY,
  mainNav,
  divisions,
  processSteps,
  whyChooseUs,
  insightArticles,
} from '@/lib/content';
import { ContactForm } from './contact-form';
import { BackToTop } from './back-to-top';
import { ArticleCard } from './article-card';

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-art">
        <Image
          src="/images/brand-architecture.png"
          alt="Bright reception with the KAARYAN LABS wall logo, mountain views, and natural light"
          fill
          sizes="(max-width: 640px) 100vw, 56vw"
          quality={100}
          priority
        />
        <div className="hero-art-fade" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">RESEARCH. STRATEGY. TECHNOLOGY. GROWTH.</p>
          <h1>
            FROM PROBLEM
            <br />
            TO <span>POSSIBILITY</span>
          </h1>
          <p className="hero-description">{COMPANY.description}</p>

          <div className="actions">
            <Link className="button" href="/services">
              Explore Our Services <ArrowRight size={15} />
            </Link>
            <Link className="button secondary" href="/contact-us">
              Start a Project <ArrowRight size={15} />
            </Link>
          </div>

          <div className="positioning">
            <div>
              <strong>Research-First</strong>
              <span>Understanding before building</span>
            </div>
            <div>
              <strong>3 Core Divisions</strong>
              <span>Technology, Research, Growth</span>
            </div>
            <div>
              <strong>Founder-Ready</strong>
              <span>From idea validation to launch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const capabilities = [
    [Globe2, 'WEB APPLICATIONS'],
    [Smartphone, 'MOBILE SOFTWARE'],
    [BrainCircuit, 'AI SOLUTIONS'],
    [Search, 'MARKET RESEARCH'],
    [Database, 'CUSTOM PLATFORMS'],
    [Cloud, 'SAAS DEVELOPMENT'],
  ] as const;

  return (
    <section className="trust-strip" aria-label="Our capabilities">
      <div className="container">
        <p>BUILT FOR VISIONARIES, BUILDERS AND FORWARD-THINKING TEAMS</p>
        <div className="capabilities">
          {capabilities.map(([Icon, title]) => (
            <span key={title}>
              <Icon aria-hidden="true" size={20} />
              {title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const values = [
    {
      icon: Search,
      title: 'Research-First Mindset',
      text: 'We go deep to understand the root problem before recommending any technology.',
    },
    {
      icon: Orbit,
      title: 'End-to-End Product Thinking',
      text: 'From market validation and UI/UX design to scalable software implementation.',
    },
    {
      icon: Sparkles,
      title: 'Impact-Focused Engineering',
      text: 'Building reliable, practical solutions that help businesses grow and operate smoothly.',
    },
  ];

  return (
    <section id="about" className="about section">
      <div className="container about-grid reveal">
        <div className="about-copy">
          <p className="eyebrow">ABOUT KAARYAN LABS</p>
          <h2>
            A Research-Driven
            <br />
            Technology & Innovation Partner
          </h2>
          <p>
            KAARYAN LABS is a research-driven technology and business innovation
            company. We help businesses and founders transform ideas into practical digital solutions.
            Our approach is simple: understand the real problem, research the requirements, recommend
            appropriate solutions, develop them, and help our clients improve their businesses.
          </p>
          <div className="about-ctas">
            <Link className="button compact" href="/about-us">
              Learn More About Us <ArrowRight size={14} />
            </Link>
            <Link className="button secondary compact" href="/our-story">
              Our Story
            </Link>
          </div>
        </div>

        <figure className="studio">
          <Image
            src="/images/studio-concept.png"
            alt="KAARYAN LABS studio with glass partitions, mountain-view windows, and the wall logo"
            width={1536}
            height={1024}
            sizes="(max-width: 640px) 90vw, 25vw"
            quality={100}
          />
          <figcaption>Brand environment concept</figcaption>
        </figure>

        <div className="about-values">
          {values.map(({ icon: Icon, title, text }) => (
            <div className="about-value" key={title}>
              <span className="round-icon">
                <Icon size={24} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Divisions() {
  return (
    <section id="divisions" className="section divisions">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">OUR THREE DIVISIONS</p>
            <h2>Three Specialized Focus Areas. One Unified Partner.</h2>
          </div>
          <p>
            We organize our capabilities across three synergistic divisions to solve real-world problems
            <br className="desktop-break" /> and guide organizations from concept to long-term growth.
          </p>
        </div>

        <div className="division-grid-three">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div className="division-card-v2 reveal" key={div.id}>
                <div className="div-card-header">
                  <span className="div-number">{div.number}</span>
                  <span className="round-icon">
                    <Icon size={24} />
                  </span>
                </div>
                <h3>{div.title}</h3>
                <p className="div-short">{div.short}</p>
                <ul className="div-service-list">
                  {div.services.slice(0, 5).map((s) => (
                    <li key={s}>
                      <CheckCircle2 size={14} /> {s}
                    </li>
                  ))}
                  {div.services.length > 5 && (
                    <li className="more-item">+ {div.services.length - 5} more capabilities</li>
                  )}
                </ul>
                <div className="div-footer">
                  <Link href={`/services#${div.id}`} className="div-link">
                    Explore Division <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">FEATURED CAPABILITIES</p>
            <h2>Research-Backed Engineering & Strategic Services</h2>
          </div>
          <p>
            We combine modern software technologies, empirical market research, and thoughtful design
            to build reliable, scalable, and user-centered solutions.
          </p>
        </div>

        <div className="expertise-grid reveal">
          <Link className="expertise-item" href="/services#software-development">
            <span className="service-icon">
              <Code2 size={26} />
            </span>
            <h3>Software Development</h3>
            <p>Web applications, mobile apps, custom software, and SaaS platforms engineered for scale.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>

          <Link className="expertise-item" href="/services#research-as-a-service">
            <span className="service-icon">
              <Search size={26} />
            </span>
            <h3>Research as a Service (RaaS)</h3>
            <p>Competitor analysis, market sizing, feasibility studies, and user requirement research.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>

          <Link className="expertise-item" href="/services#ai-as-a-service">
            <span className="service-icon">
              <BrainCircuit size={26} />
            </span>
            <h3>AI as a Service (AaaS)</h3>
            <p>Intelligent workflow automation, custom LLM integration, and pragmatic AI applications.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>

          <Link className="expertise-item" href="/services#design-branding">
            <span className="service-icon">
              <Sparkles size={26} />
            </span>
            <h3>Design & Branding</h3>
            <p>UI/UX interfaces, clickable prototypes, and comprehensive corporate brand identities.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>

          <Link className="expertise-item" href="/services#digital-marketing">
            <span className="service-icon">
              <TrendingUp size={26} />
            </span>
            <h3>Digital Marketing</h3>
            <p>Meta Ads campaigns, SEO strategy, social media growth, and conversion optimization.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>

          <Link className="expertise-item" href="/services#content-research-media">
            <span className="service-icon">
              <Cloud size={26} />
            </span>
            <h3>Content & Media Services</h3>
            <p>Technical articles, research paper writing assistance, and press release drafting.</p>
            <span className="service-arrow-link">
              View Services <ArrowRight className="service-arrow" size={17} />
            </span>
          </Link>
        </div>

        <div className="center-cta reveal" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/services" className="button">
            View All 7 Service Categories <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="section why-choose">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">WHY CHOOSE KAARYAN LABS</p>
            <h2>Built for Visionaries, Builders & Forward-Thinking Teams</h2>
          </div>
          <p>
            Our disciplined research-first philosophy ensures your investment creates real-world impact
            without wasted engineering or inflated assumptions.
          </p>
        </div>

        <div className="why-grid reveal">
          {whyChooseUs.map((item) => {
            const Icon = item.icon;
            return (
              <div className="why-card" key={item.title}>
                <span className="round-icon">
                  <Icon size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Workflow() {
  return (
    <section id="process" className="section workflow">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">OUR 9-STEP WORKFLOW</p>
            <h2>From Problem to Possibility: A Structured Journey</h2>
          </div>
          <p>
            A disciplined, research-led process to turn complex problems into reliable, scalable solutions.
          </p>
        </div>

        <div className="process-preview-grid reveal">
          {processSteps.slice(0, 6).map((step) => {
            const Icon = step.icon;
            return (
              <div className="step-preview-card" key={step.step}>
                <div className="step-header">
                  <span className="step-badge">Step {step.step}</span>
                  <Icon size={20} className="step-icon" />
                </div>
                <h3>{step.name}</h3>
                <p className="step-tagline">{step.tagline}</p>
                <p className="step-desc">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="center-cta reveal" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/our-process" className="button secondary">
            Explore All 9 Workflow Steps <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StartupSupportSection() {
  return (
    <section className="section startup-home">
      <div className="container startup-home-inner reveal">
        <div className="startup-home-content">
          <p className="eyebrow">STARTUP & FOUNDER SUPPORT</p>
          <h2>Have a Startup Idea? Let’s Explore It Together.</h2>
          <p>
            Taking a startup idea from hypothesis to launch requires a balance of market validation,
            pragmatic engineering, and clean design. We act as your research-driven technical partner,
            assisting with idea validation, competitor mapping, pitch decks, clickable prototypes, and MVP engineering.
          </p>
          <div className="startup-highlights">
            <div>
              <CheckCircle2 size={16} /> <span>Idea research & market validation</span>
            </div>
            <div>
              <CheckCircle2 size={16} /> <span>Interactive clickable prototypes</span>
            </div>
            <div>
              <CheckCircle2 size={16} /> <span>Minimum Viable Product (MVP) development</span>
            </div>
            <div>
              <CheckCircle2 size={16} /> <span>Pitch deck preparation & launch support</span>
            </div>
          </div>
          <p className="disclaimer-note">
            Notice: We provide research, technical, and strategic support. We do not guarantee funding,
            investor approval, or business success. Services can be customized flexibly to your stage.
          </p>
          <div className="actions" style={{ marginTop: '1.5rem' }}>
            <Link href="/startup-support" className="button">
              Explore Founder Support <ArrowRight size={15} />
            </Link>
            <Link href="/contact-us" className="button secondary">
              Discuss Your Idea
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsHome() {
  return (
    <section id="insights" className="section insights-home">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">LATEST INSIGHTS & ARTICLES</p>
            <h2>Research, Technology & Strategic Perspectives</h2>
          </div>
          <p>
            Thought leadership and analytical perspectives from KAARYAN LABS on software engineering,
            market research, AI integration, and startup execution.
          </p>
        </div>

        <div className="insights-home-grid reveal">
          {insightArticles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="center-cta reveal" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/insights" className="button secondary">
            Browse All Insights <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Contact({ configured }: { configured: boolean }) {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow">LET’S BUILD TOGETHER</p>
          <h2>Have a problem worth solving?</h2>
          <p className="contact-intro">
            Whether you are exploring a new digital product idea, need an experienced software development partner,
            or want research-backed market intelligence, we would love to understand your goals.
          </p>

          <div className="contact-cards-stack">
            {/* WhatsApp */}
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-box whatsapp"
              aria-label="Message KAARYAN LABS on WhatsApp"
            >
              <span className="round-icon whatsapp-bg">
                <MessageCircle size={22} />
              </span>
              <div className="contact-card-text">
                <strong className="channel-title">WhatsApp Direct Support</strong>
                <span className="channel-value">+91 9493934972</span>
                <span className="channel-note">Click for immediate conversation & quick discussion</span>
              </div>
              <ExternalLink size={16} className="card-external-arrow" />
            </a>

            {/* Phone */}
            <a href={COMPANY.phoneTel} className="contact-card-box" aria-label="Call KAARYAN LABS directly">
              <span className="round-icon phone-bg">
                <Phone size={22} />
              </span>
              <div className="contact-card-text">
                <strong className="channel-title">Direct Phone Call</strong>
                <span className="channel-value">{COMPANY.phone}</span>
                <span className="channel-note">Available Mon – Sat, 9:00 AM – 7:00 PM IST</span>
              </div>
            </a>

            {/* Email */}
            <a href={COMPANY.emailMailto} className="contact-card-box" aria-label="Email KAARYAN LABS">
              <span className="round-icon email-bg">
                <Mail size={22} />
              </span>
              <div className="contact-card-text">
                <strong className="channel-title">Official Email Address</strong>
                <span className="channel-value">{COMPANY.email}</span>
                <span className="channel-note">For formal proposals, inquiries & RFP documents</span>
              </div>
            </a>
          </div>

          <div className="social-block-card">
            <span className="social-heading">Connect with KAARYAN LABS</span>
            <div className="social-buttons-row">
              <a
                href={COMPANY.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn linkedin"
              >
                LinkedIn Profile <ExternalLink size={12} />
              </a>
              <a
                href={COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram"
              >
                Instagram Profile <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <ContactForm configured={configured} />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link className="footer-brand" href="/" aria-label="KAARYAN LABS home">
              <Image
                src="/brand/kaaryan-lockup-v2.webp"
                alt="KAARYAN LABS — From Problem to Possibility"
                width={1800}
                height={486}
                sizes="(max-width: 640px) 180px, 240px"
                quality={100}
              />
            </Link>
            <p className="footer-tagline-text">{COMPANY.tagline}</p>
            <p className="footer-brief">
              A research-driven technology and business innovation company. We help businesses
              and founders transform ideas into practical digital solutions.
            </p>
          </div>

          <div className="footer-navigation">
            <h3>Quick Links</h3>
            <div>
              {mainNav.map(({ label, href }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-contact-col">
            <h3>Official Contact</h3>
            <div className="footer-contact-list">
              <a href={COMPANY.phoneTel}>
                <Phone size={15} /> {COMPANY.phone}
              </a>
              <a href={COMPANY.emailMailto}>
                <Mail size={15} /> {COMPANY.email}
              </a>
              <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} /> WhatsApp Support
              </a>
              <a href={COMPANY.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile <ExternalLink size={12} />
              </a>
              <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram Profile <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} KAARYAN LABS. All rights reserved.</p>
          <span>RESEARCH. STRATEGY. TECHNOLOGY. GROWTH.</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
