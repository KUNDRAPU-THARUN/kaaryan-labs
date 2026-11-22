import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Tag, Share2 } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { ArticleCard } from '@/components/article-card';
import { insightArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Insights & Perspectives | KAARYAN LABS — Research, Technology & Business',
  description:
    'Read articles, technical guides, and market perspectives from KAARYAN LABS covering software engineering, Research as a Service, practical AI, and startup execution.',
  alternates: { canonical: '/insights' },
};

const categories = [
  'All',
  'Technology',
  'Artificial Intelligence',
  'Software Development',
  'Startup Insights',
  'Business Research',
  'Market Analysis',
  'Digital Marketing',
  'Company Announcements',
];

export default function InsightsPage() {
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
              <span aria-current="page">Insights</span>
            </nav>
            <p className="eyebrow">RESEARCH & INDUSTRY PERSPECTIVES</p>
            <h1>Thought Leadership from KAARYAN LABS</h1>
            <p className="page-intro">
              Practical perspectives on software architecture, market intelligence, disciplined product development,
              and artificial intelligence integration. Designed for founders, engineers, and innovation leaders.
            </p>
          </div>
        </header>

        {/* Categories Bar */}
        <section className="section bg-soft" style={{ padding: '1.5rem 0', overflow: 'hidden' }}>
          <div className="container" style={{ overflow: 'hidden' }}>
            <div className="category-scroll-bar">
              {categories.map((cat, i) => (
                <span
                  key={cat}
                  className={`category-pill ${i === 0 ? 'active' : ''}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="section bg-white">
          <div className="container">
            <div className="insights-grid reveal">
              {insightArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} showTags={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / Connect CTA */}
        <section className="section cta-banner">
          <div className="container cta-banner-inner reveal">
            <h2>Want to collaborate on research or a project?</h2>
            <p>
              We frequently write about topics our clients are navigating. If you have an inquiry or topic
              you would like us to analyze, connect with our team.
            </p>
            <div className="cta-banner-buttons">
              <Link href="/contact-us" className="button">
                Get In Touch <ArrowRight size={15} />
              </Link>
              <Link href="/services" className="button secondary">
                Explore Our Services
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
