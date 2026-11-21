import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
  Calendar,
  User,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { insightArticles, COMPANY } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | KAARYAN LABS' };

  return {
    title: `${article.title} | KAARYAN LABS Insights`,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      url: `${COMPANY.websiteUrl}insights/${article.slug}`,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const otherArticles = insightArticles.filter((a) => a.slug !== slug).slice(0, 2);
  const articleUrl = `${COMPANY.websiteUrl}insights/${article.slug}`;
  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${article.title} - ${articleUrl}`)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="subpage article-subpage">
        <header className="article-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/insights">Insights</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.category}</span>
            </nav>

            <span className="badge article-badge">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-lead">{article.summary}</p>

            <div className="article-meta-bar">
              <div className="meta-left">
                <span className="meta-item">
                  <User size={15} /> {article.publisher}
                </span>
                <span className="meta-item">
                  <Calendar size={15} /> {article.date}
                </span>
                <span className="meta-item">
                  <Clock size={15} /> {article.readTime}
                </span>
              </div>

              <div className="share-buttons">
                <span className="share-text">Share:</span>
                <a
                  href={shareWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn whatsapp"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
                <a
                  href={shareLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn linkedin"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={shareTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn twitter"
                  title="Share on X"
                  aria-label="Share on X"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <section className="section bg-white">
          <div className="container article-body-container">
            <div className="article-prose">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="article-tags-block">
              <strong>Topics & Tags:</strong>
              <div className="tags-list">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back link */}
            <div className="article-nav-back">
              <Link href="/insights" className="button secondary compact">
                <ArrowLeft size={14} /> Back to All Insights
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {otherArticles.length > 0 && (
          <section className="section bg-soft">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <p className="eyebrow">RELATED PERSPECTIVES</p>
                  <h2>Continue Reading</h2>
                </div>
              </div>

              <div className="insights-grid reveal">
                {otherArticles.map((rel) => (
                  <article className="insight-full-card" key={rel.slug}>
                    <div className="card-top-meta">
                      <span className="badge">{rel.category}</span>
                      <span className="read-time-indicator">
                        <Clock size={13} /> {rel.readTime}
                      </span>
                    </div>
                    <h3>
                      <Link href={`/insights/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="article-summary">{rel.summary}</p>
                    <div className="card-bottom-bar">
                      <div className="publisher-info">
                        <strong>{rel.publisher}</strong>
                        <span>{rel.date}</span>
                      </div>
                      <Link href={`/insights/${rel.slug}`} className="read-btn">
                        Read Article <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
