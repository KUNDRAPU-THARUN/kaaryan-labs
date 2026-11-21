import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_DIR = path.resolve('tests/screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runComprehensiveVerification() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = {
    navigation: [],
    capabilitiesRow: {},
    serviceCards: {},
    responsive: {},
    consoleErrors: []
  };

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  console.log('=== PART 1: NAVIGATION SCROLL TESTS ===');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // Test 1: From home (at top), click About Us
  let link = page.locator('.desktop-links a[href="/about-us"]');
  await link.click();
  await page.waitForTimeout(600);
  let scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Home top -> About Us', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 2: Scroll down to 1500px on About Us, click Services
  await page.evaluate(() => window.scrollTo(0, 1500));
  link = page.locator('.desktop-links a[href="/services"]');
  await link.click({ force: true });
  await page.waitForURL('**/services');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'About Us (1500px) -> Services', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 3: Scroll down to 2000px on Services, click Our Process
  await page.evaluate(() => window.scrollTo(0, 2000));
  link = page.locator('.desktop-links a[href="/our-process"]');
  await link.click({ force: true });
  await page.waitForURL('**/our-process');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Services (2000px) -> Our Process', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 4: Scroll down to 2500px on Our Process, click Startup Support
  await page.evaluate(() => window.scrollTo(0, 2500));
  link = page.locator('.desktop-links a[href="/startup-support"]');
  await link.click({ force: true });
  await page.waitForURL('**/startup-support');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Our Process (2500px) -> Startup Support', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 5: Scroll down to 2000px on Startup Support, click Insights
  await page.evaluate(() => window.scrollTo(0, 2000));
  link = page.locator('.desktop-links a[href="/insights"]');
  await link.click({ force: true });
  await page.waitForURL('**/insights');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Startup Support (2000px) -> Insights', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 6: Scroll down to 1500px on Insights, click Contact Us
  await page.evaluate(() => window.scrollTo(0, 1500));
  link = page.locator('.desktop-links a[href="/contact-us"]');
  await link.click({ force: true });
  await page.waitForURL('**/contact-us');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Insights (1500px) -> Contact Us', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 7: Scroll down to 1500px on Contact Us, click Home
  await page.evaluate(() => window.scrollTo(0, 1500));
  link = page.locator('.desktop-links a[href="/"]');
  await link.click({ force: true });
  await page.waitForURL('http://127.0.0.1:3000/');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Contact Us (1500px) -> Home', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 8: Scroll down to 2000px on Home, click "Start a Project" (CTA)
  await page.evaluate(() => window.scrollTo(0, 2000));
  link = page.locator('.nav-cta');
  await link.click({ force: true });
  await page.waitForURL('**/contact-us');
  await page.waitForTimeout(300);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Home (2000px) -> Start a Project', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 9: Same page click - on /about-us scrolled down to 1200px, click About Us again
  await page.goto('http://127.0.0.1:3000/about-us', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 1200));
  link = page.locator('.desktop-links a[href="/about-us"]');
  await link.click({ force: true });
  await page.waitForTimeout(1200); // allow smooth scroll to complete
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'About Us (1200px) -> Click About Us again', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 10: Footer Back to Top button
  await page.goto('http://127.0.0.1:3000/services', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 2500));
  const bttBtn = page.locator('.back-to-top-button');
  await bttBtn.click();
  await page.waitForTimeout(1500); // allow smooth scroll to reach top
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Services (2500px) -> Footer Back to Top', url: page.url(), scrollY, pass: scrollY === 0 });

  // Test 11: Browser Back / Forward
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.locator('.desktop-links a[href="/about-us"]').click();
  await page.waitForTimeout(500);
  await page.goBack();
  await page.waitForTimeout(500);
  scrollY = await page.evaluate(() => window.scrollY);
  results.navigation.push({ test: 'Browser Back to Home', url: page.url(), scrollY, pass: scrollY === 0 });

  console.log('Navigation results:', results.navigation);

  console.log('\n=== PART 2: HOMEPAGE CAPABILITIES ROW (6 ITEMS IN ONE LINE) ===');
  const desktopWidths = [1920, 1440, 1366, 1025];
  for (const w of desktopWidths) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

    const items = await page.locator('.capabilities > span').evaluateAll(elements =>
      elements.map(el => {
        const rect = el.getBoundingClientRect();
        return {
          text: el.innerText.trim(),
          top: Math.round(rect.top),
          height: Math.round(rect.height),
          width: Math.round(rect.width),
        };
      })
    );

    const firstTop = items[0]?.top;
    const allSameLine = items.every(item => Math.abs(item.top - firstTop) <= 2);
    results.capabilitiesRow[`${w}px`] = {
      itemCount: items.length,
      allSameLine,
      items
    };
  }
  console.log('Capabilities row desktop results:', {
    '1920px_allSameLine': results.capabilitiesRow['1920px'].allSameLine,
    '1440px_allSameLine': results.capabilitiesRow['1440px'].allSameLine,
    '1366px_allSameLine': results.capabilitiesRow['1366px'].allSameLine,
    '1025px_allSameLine': results.capabilitiesRow['1025px'].allSameLine,
  });

  // Take screenshot of capabilities row
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  const trustStripEl = page.locator('.trust-strip');
  await trustStripEl.screenshot({ path: path.join(SCREENSHOT_DIR, 'capabilities-row-desktop.png') });

  console.log('\n=== PART 3: FEATURED CAPABILITIES SERVICE CARDS ===');
  const cards = await page.locator('.expertise-item').evaluateAll(elements =>
    elements.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        index: i,
        title: el.querySelector('h3')?.innerText.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        padding: style.padding,
        borderRadius: style.borderRadius,
        borderWidth: style.borderWidth,
      };
    })
  );

  const row1 = cards.slice(0, 3);
  const row2 = cards.slice(3, 6);
  const row1SameWidth = row1.every(c => Math.abs(c.width - row1[0].width) <= 2);
  const row1SameHeight = row1.every(c => Math.abs(c.height - row1[0].height) <= 2);
  const row2SameWidth = row2.every(c => Math.abs(c.width - row2[0].width) <= 2);
  const row2SameHeight = row2.every(c => Math.abs(c.height - row2[0].height) <= 2);
  const allCardsSameWidth = cards.every(c => Math.abs(c.width - cards[0].width) <= 2);

  results.serviceCards.dimensions = {
    totalCards: cards.length,
    row1SameWidth,
    row1SameHeight,
    row2SameWidth,
    row2SameHeight,
    allCardsSameWidth,
    cardWidth: cards[0]?.width,
    cardHeights: [row1[0]?.height, row2[0]?.height],
    cards
  };

  // Test Hover State
  const firstCard = page.locator('.expertise-item').first();
  const initialBox = await firstCard.boundingBox();
  await firstCard.hover();
  await page.waitForTimeout(300);
  const hoveredStyle = await firstCard.evaluate(el => {
    const s = window.getComputedStyle(el);
    return {
      backgroundColor: s.backgroundColor,
      borderColor: s.borderColor,
      boxShadow: s.boxShadow,
      transform: s.transform
    };
  });
  const hoveredBox = await firstCard.boundingBox();
  const dimensionsUnchanged =
    Math.round(initialBox.width) === Math.round(hoveredBox.width) &&
    Math.round(initialBox.height) === Math.round(hoveredBox.height);

  results.serviceCards.hover = {
    hoveredStyle,
    dimensionsUnchanged,
    initialBox,
    hoveredBox
  };

  // Screenshot of featured capabilities
  const expertiseSection = page.locator('.expertise');
  await expertiseSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'featured-capabilities-hover.png') });

  console.log('Service cards consistency results:', {
    allCardsSameWidth,
    row1SameHeight,
    row2SameHeight,
    hoverBackgroundColor: hoveredStyle.backgroundColor,
    hoverBorderColor: hoveredStyle.borderColor,
    dimensionsUnchanged
  });

  console.log('\n=== PART 4: RESPONSIVE VIEWPORT CHECKS ===');
  const viewports = [1920, 1440, 1366, 1024, 768, 430, 375, 320];
  const pages = ['/', '/about-us', '/services', '/our-process', '/startup-support', '/insights', '/contact-us'];

  for (const vp of viewports) {
    results.responsive[`${vp}px`] = [];
    await page.setViewportSize({ width: vp, height: 900 });

    for (const p of pages) {
      await page.goto(`http://127.0.0.1:3000${p}`, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      if (overflow > 1) {
        results.responsive[`${vp}px`].push({ page: p, overflow });
      }
    }
  }

  console.log('Responsive overflow results across 8 viewports:');
  for (const [vp, overflows] of Object.entries(results.responsive)) {
    console.log(`  ${vp}: ${overflows.length === 0 ? 'CLEAN (0 overflow)' : JSON.stringify(overflows)}`);
  }

  await browser.close();
  console.log('\nAll checks complete!');
  fs.writeFileSync('tests/audit-fixes-report.json', JSON.stringify(results, null, 2));
}

runComprehensiveVerification().catch(console.error);
