import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { InsightArticle } from '@/lib/content';

export function ArticleCard({
  article,
  showTags = false,
}: {
  article: InsightArticle;
  showTags?: boolean;
}) {
  return (
    <article className="insight-card">
      {/* 1. Article metadata row: [Category] on left, [Reading Time] on right */}
      <div className="insight-card-meta">
        <span className="insight-category-badge">{article.category}</span>
        <span className="insight-read-time">
          <Clock size={13} aria-hidden="true" />
          <span>{article.readTime}</span>
        </span>
      </div>

      {/* 2. Article title */}
      <h3 className="insight-card-title">
        <Link href={`/insights/${article.slug}`}>{article.title}</Link>
      </h3>

      {/* 3. Description */}
      <p className="insight-card-description">{article.summary}</p>

      {/* Optional tags for Insights page */}
      {showTags && article.tags && article.tags.length > 0 && (
        <div className="insight-tag-row">
          {article.tags.map((t) => (
            <span key={t} className="tag-chip">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* 4. Article footer: Author / Publisher on left, Read Action on right */}
      <div className="insight-card-footer">
        <div className="insight-author-info">
          <span className="insight-author">{article.publisher}</span>
          {article.date && <span className="insight-date">{article.date}</span>}
        </div>
        <Link href={`/insights/${article.slug}`} className="insight-read-action">
          <span>Read Article</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
