'use client';

export function BackToTop() {
  return (
    <button
      type="button"
      className="back-to-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top"
    >
      Back to top ↑
    </button>
  );
}
