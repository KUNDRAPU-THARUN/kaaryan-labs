import { chromium } from '@playwright/test';

async function verifyComponents() {
  console.log('Verifying mobile components on http://127.0.0.1:3000/ ...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
  });
  const page = await context.newPage();

  // 1. Homepage Verification
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // A. Hero Art proportions
  const heroArt = await page.evaluate(() => {
    const el = document.querySelector('.hero-art');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { width: Math.round(rect.width), height: Math.round(rect.height), visible: rect.height > 0 };
  });

  // B. Capabilities: 6 items in 2 columns with NO stretching
  const capabilities = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.capabilities > span'));
    return items.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        index: i + 1,
        text: el.innerText.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        gridColumn: style.gridColumn,
      };
    });
  });

  // C. Homepage Article Cards
  const homeArticles = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.insight-card'));
    return cards.map((card, i) => {
      const meta = card.querySelector('.insight-card-meta');
      const badge = card.querySelector('.insight-category-badge');
      const time = card.querySelector('.insight-read-time');
      const footer = card.querySelector('.insight-card-footer');
      const author = card.querySelector('.insight-author');
      const action = card.querySelector('.insight-read-action');

      const badgeRect = badge?.getBoundingClientRect();
      const timeRect = time?.getBoundingClientRect();
      const authorRect = author?.getBoundingClientRect();
      const actionRect = action?.getBoundingClientRect();

      return {
        cardIndex: i + 1,
        categoryText: badge?.innerText.trim(),
        timeText: time?.innerText.trim(),
        metaSeparated: timeRect && badgeRect ? timeRect.left > badgeRect.right : false,
        authorText: author?.innerText.trim(),
        actionText: action?.innerText.trim(),
        footerSeparated: actionRect && authorRect ? actionRect.left > authorRect.right : false,
      };
    });
  });

  // D. Contact Form on Home
  const contactForm = await page.evaluate(() => {
    const form = document.querySelector('.contact-form');
    if (!form) return null;
    const formRect = form.getBoundingClientRect();
    const configNote = form.querySelector('.configuration-note');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitRect = submitBtn?.getBoundingClientRect();
    const noteRect = configNote?.getBoundingClientRect();
    return {
      formWidth: Math.round(formRect.width),
      configNoteVisible: configNote ? noteRect.height > 0 : false,
      configNoteText: configNote?.innerText.trim(),
      submitBtnWidth: Math.round(submitRect?.width || 0),
      submitBtnDisabled: submitBtn?.disabled || false,
    };
  });

  // E. WhatsApp Button
  const whatsapp = await page.evaluate(() => {
    const btn = document.querySelector('.whatsapp-float');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const style = window.getComputedStyle(btn);
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      position: style.position,
      bottom: style.bottom,
      right: style.right,
      zIndex: style.zIndex,
    };
  });

  // 2. Insights Page Verification
  await page.goto('http://127.0.0.1:3000/insights', { waitUntil: 'networkidle' });
  const insightsPageArticles = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.insight-card'));
    return cards.map((card, i) => {
      const badge = card.querySelector('.insight-category-badge');
      const time = card.querySelector('.insight-read-time');
      const author = card.querySelector('.insight-author');
      const action = card.querySelector('.insight-read-action');
      const badgeRect = badge?.getBoundingClientRect();
      const timeRect = time?.getBoundingClientRect();
      const authorRect = author?.getBoundingClientRect();
      const actionRect = action?.getBoundingClientRect();
      return {
        cardIndex: i + 1,
        category: badge?.innerText.trim(),
        time: time?.innerText.trim(),
        metaSeparated: timeRect && badgeRect ? timeRect.left > badgeRect.right : false,
        author: author?.innerText.trim(),
        action: action?.innerText.trim(),
        footerSeparated: actionRect && authorRect ? actionRect.left > authorRect.right : false,
      };
    });
  });

  console.log('--- VERIFICATION RESULTS ---');
  console.log('Hero Art:', JSON.stringify(heroArt));
  console.log('Capabilities (2-col check):', JSON.stringify(capabilities));
  console.log('Homepage Articles:', JSON.stringify(homeArticles));
  console.log('Insights Page Articles:', JSON.stringify(insightsPageArticles));
  console.log('Contact Form:', JSON.stringify(contactForm));
  console.log('WhatsApp Button:', JSON.stringify(whatsapp));

  await browser.close();
}

verifyComponents().catch(console.error);
