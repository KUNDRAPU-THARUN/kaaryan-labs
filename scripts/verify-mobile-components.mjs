import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_DIR = path.resolve('tests/screenshots/mobile-audit');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function verifyComponents() {
  console.log('Verifying mobile components on http://127.0.0.1:3000/ ...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // Mobile Context (375x812 - iPhone standard)
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
  });
  const page = await context.newPage();

  // 1. Homepage Verification
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // A. Hero Section Checks
  const heroInfo = await page.evaluate(() => {
    const h1 = document.querySelector('.hero h1');
    const eyebrow = document.querySelector('.hero-eyebrow');
    const p = document.querySelector('.hero-description');
    const art = document.querySelector('.hero-art');
    const pos = document.querySelectorAll('.positioning > div');
    const actions = document.querySelectorAll('.hero .actions a');

    const h1Style = h1 ? window.getComputedStyle(h1) : null;
    const eyeStyle = eyebrow ? window.getComputedStyle(eyebrow) : null;
    const pStyle = p ? window.getComputedStyle(p) : null;
    const artRect = art ? art.getBoundingClientRect() : null;

    return {
      h1FontSize: h1Style?.fontSize,
      h1FontWeight: h1Style?.fontWeight,
      eyebrowFontSize: eyeStyle?.fontSize,
      descriptionFontSize: pStyle?.fontSize,
      descriptionLineHeight: pStyle?.lineHeight,
      artWidth: Math.round(artRect?.width || 0),
      artHeight: Math.round(artRect?.height || 0),
      positioningCardsCount: pos.length,
      positioningCard1Title: pos[0]?.querySelector('strong')?.innerText,
      positioningCard1Detail: pos[0]?.querySelector('span')?.innerText,
      actionsCount: actions.length,
      action1Text: actions[0]?.innerText.trim(),
    };
  });

  // B. Capabilities 2-Column Grid
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
        fontSize: style.fontSize,
        gridColumn: style.gridColumn,
      };
    });
  });

  // C. Service / Expertise Cards
  const services = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.expertise-item'));
    return items.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const h3 = el.querySelector('h3');
      const p = el.querySelector('p');
      const cta = el.querySelector('.service-arrow-link');
      const icon = el.querySelector('.service-icon');
      return {
        index: i + 1,
        title: h3?.innerText.trim(),
        width: Math.round(rect.width),
        iconVisible: !!icon,
        ctaVisible: !!cta,
        ctaText: cta?.innerText.trim(),
      };
    });
  });

  // D. Process Step Cards
  const processSteps = await page.evaluate(() => {
    const steps = Array.from(document.querySelectorAll('.step-preview-card'));
    return steps.map((s, i) => {
      const badge = s.querySelector('.step-badge');
      const h3 = s.querySelector('h3');
      const tagline = s.querySelector('.step-tagline');
      return {
        stepIndex: i + 1,
        badgeText: badge?.innerText.trim(),
        title: h3?.innerText.trim(),
        tagline: tagline?.innerText.trim(),
      };
    });
  });

  // E. Insights Cards
  const homeArticles = await page.evaluate(() => {
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

  // F. Contact Channels & Contact Form
  const contactDetails = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.contact-card-box'));
    const socialBtns = Array.from(document.querySelectorAll('.social-btn'));
    const form = document.querySelector('.contact-form');
    const formRect = form?.getBoundingClientRect();
    const configNote = form?.querySelector('.configuration-note');
    const submitBtn = form?.querySelector('button[type="submit"]');

    return {
      channelCardsCount: cards.length,
      channels: cards.map(c => ({
        href: c.getAttribute('href'),
        title: c.querySelector('.channel-title')?.innerText.trim(),
        value: c.querySelector('.channel-value')?.innerText.trim(),
        height: Math.round(c.getBoundingClientRect().height),
      })),
      socialButtons: socialBtns.map(b => ({
        text: b.innerText.trim(),
        href: b.getAttribute('href'),
        height: Math.round(b.getBoundingClientRect().height),
      })),
      formWidth: Math.round(formRect?.width || 0),
      configNoteVisible: !!configNote,
      configNoteText: configNote?.innerText.trim(),
      submitBtnDisabled: submitBtn?.disabled,
      submitBtnHeight: Math.round(submitBtn?.getBoundingClientRect().height || 0),
    };
  });

  // G. WhatsApp Floating Button
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
    };
  });

  // Capture Screenshots
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'home-375px.png'), fullPage: true });

  // Check 320px screen
  const context320 = await browser.newContext({ viewport: { width: 320, height: 600 } });
  const page320 = await context320.newPage();
  await page320.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  const docWidth320 = await page320.evaluate(() => document.documentElement.scrollWidth);
  await page320.screenshot({ path: path.join(SCREENSHOT_DIR, 'home-320px.png'), fullPage: true });

  // Check Desktop 1440px
  const contextDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  const desktopCapabilities = await pageDesktop.evaluate(() => {
    const el = document.querySelector('.capabilities');
    const items = Array.from(document.querySelectorAll('.capabilities > span'));
    const style = window.getComputedStyle(el);
    return {
      gridTemplateColumns: style.gridTemplateColumns,
      itemsCount: items.length,
      allSameRow: items[0].getBoundingClientRect().top === items[5].getBoundingClientRect().top,
    };
  });

  console.log('=== VERIFICATION AUDIT RESULTS ===');
  console.log('Hero Info:', JSON.stringify(heroInfo, null, 2));
  console.log('Capabilities (2-col mobile):', JSON.stringify(capabilities, null, 2));
  console.log('Services Cards Count:', services.length);
  console.log('Process Steps Count:', processSteps.length);
  console.log('Home Articles:', JSON.stringify(homeArticles, null, 2));
  console.log('Contact Details & Form:', JSON.stringify(contactDetails, null, 2));
  console.log('WhatsApp Button:', JSON.stringify(whatsapp, null, 2));
  console.log('Doc Width at 320px Viewport:', docWidth320, docWidth320 === 320 ? '✅ NO OVERFLOW' : '❌ OVERFLOW');
  console.log('Desktop 1440px Capabilities Row:', JSON.stringify(desktopCapabilities, null, 2));

  await browser.close();
}

verifyComponents().catch(console.error);
