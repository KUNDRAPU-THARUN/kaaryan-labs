import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });

const pagesToTest = [
  '/',
  '/about-us',
  '/our-story',
  '/services',
  '/our-process',
  '/startup-support',
  '/insights',
  '/insights/from-problem-to-possibility-research-led-software',
  '/insights/understanding-raas-research-as-a-service',
  '/insights/practical-ai-integration-for-growing-businesses',
  '/insights/lean-mvp-blueprint-validating-startup-ideas',
  '/insights/clear-technical-communication-pr-articles',
  '/contact-us',
];

const auditResults = {
  pages: {},
  brokenLinks: [],
  consoleErrors: [],
  formValidation: {},
  overflows: [],
};

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      auditResults.consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  page.on('pageerror', err => {
    auditResults.consoleErrors.push({ url: page.url(), text: err.message });
  });

  for (const path of pagesToTest) {
    const fullUrl = `${base}${path}`;
    const res = await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    const status = res?.status();
    const title = await page.title();

    // Extract all links on this page
    const links = await page.locator('a[href]').evaluateAll(elements =>
      elements.map(el => ({
        text: el.innerText.trim().replace(/\s+/g, ' '),
        href: el.getAttribute('href'),
        visible: el.offsetParent !== null,
        ariaLabel: el.getAttribute('aria-label'),
      }))
    );

    // Extract all buttons
    const buttons = await page.locator('button').evaluateAll(elements =>
      elements.map(el => ({
        text: el.innerText.trim().replace(/\s+/g, ' '),
        ariaLabel: el.getAttribute('aria-label'),
        disabled: el.disabled,
        visible: el.offsetParent !== null,
      }))
    );

    // Extract headings
    const headings = await page.locator('h1, h2, h3').evaluateAll(elements =>
      elements.map(el => ({
        tag: el.tagName,
        text: el.innerText.trim().replace(/\s+/g, ' '),
      }))
    );

    // Verify images
    const brokenImages = await page.locator('img').evaluateAll(elements =>
      elements
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src || img.getAttribute('src'))
    );

    auditResults.pages[path] = {
      status,
      title,
      linkCount: links.length,
      buttonCount: buttons.length,
      headingCount: headings.length,
      headings: headings.slice(0, 5),
      brokenImages,
      sampleLinks: links.slice(0, 10),
    };

    // Check internal links for 404s
    for (const link of links) {
      if (link.href && link.href.startsWith('/') && !link.href.startsWith('//') && !link.href.includes('#')) {
        const testRes = await fetch(`${base}${link.href}`);
        if (testRes.status !== 200 && testRes.status !== 307 && testRes.status !== 308) {
          auditResults.brokenLinks.push({ from: path, text: link.text, href: link.href, status: testRes.status });
        }
      }
    }
  }

  // Test Contact Form on /contact-us
  await page.goto(`${base}/contact-us`, { waitUntil: 'networkidle' });
  const form = page.getByRole('form', { name: 'Project inquiry' });
  const formExists = (await form.count()) > 0;
  let formValidInitial = false;
  let formValidFilled = false;
  let submitDisabled = false;

  if (formExists) {
    formValidInitial = await form.evaluate(el => el.checkValidity());
    submitDisabled = await form.locator('button[type=submit]').isDisabled();

    // Fill valid data
    await form.locator('input[name=name]').fill('Audit Reviewer');
    await form.locator('input[name=email]').fill('audit@example.com');
    await form.locator('textarea[name=description]').fill('This is an in-depth automated interaction quality check.');
    await form.locator('select[name=projectType]').selectOption('Web Application');
    formValidFilled = await form.evaluate(el => el.checkValidity());
  }

  auditResults.formValidation = {
    formExists,
    formValidInitial,
    submitDisabled,
    formValidFilled,
  };

  // Test Mobile Navigation Drawer at 375px
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base, { waitUntil: 'networkidle' });
  const menuToggle = page.getByRole('button', { name: 'Open navigation' });
  const menuExists = (await menuToggle.count()) > 0;
  let menuOpens = false;
  let escCloses = false;

  if (menuExists) {
    await menuToggle.click();
    menuOpens = (await page.locator('#mobile-nav').count()) > 0;
    await page.keyboard.press('Escape');
    escCloses = (await page.locator('#mobile-nav').count()) === 0;
  }

  auditResults.mobileMenu = { menuExists, menuOpens, escCloses };

  // Test Horizontal Overflow across 8 viewports on homepage and services page
  const widths = [1920, 1440, 1366, 1024, 768, 430, 375, 320];
  for (const path of ['/', '/services', '/contact-us', '/about-us']) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(50);
      const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      if (docWidth > width) {
        auditResults.overflows.push({ path, width, docWidth, diff: docWidth - width });
      }
    }
  }

  console.log(JSON.stringify(auditResults, null, 2));
} finally {
  await browser.close();
}
