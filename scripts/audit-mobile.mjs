import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_DIR = path.resolve('tests/screenshots/mobile');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const viewports = [
  { name: 'width-320', width: 320, height: 600, label: '320px - Compact small-screen' },
  { name: 'width-360', width: 360, height: 740, label: '360px - Comfortable mobile' },
  { name: 'width-375', width: 375, height: 667, label: '375px - Consistent smartphone' },
  { name: 'width-390', width: 390, height: 844, label: '390px - Balanced modern mobile' },
  { name: 'width-412', width: 412, height: 915, label: '412px - Spacious mobile' },
  { name: 'width-430', width: 430, height: 932, label: '430px - Larger smartphone' },
  { name: 'width-768', width: 768, height: 1024, label: '768px - Tablet layout' },
  { name: 'width-1024', width: 1024, height: 768, label: '1024px - Small desktop / tablet' },
];

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about-us' },
  { name: 'services', path: '/services' },
  { name: 'process', path: '/our-process' },
  { name: 'startup', path: '/startup-support' },
  { name: 'insights', path: '/insights' },
  { name: 'article', path: '/insights/from-problem-to-possibility-research-led-software' },
  { name: 'contact', path: '/contact-us' },
];

async function runMobileAudit() {
  console.log('Starting full mobile audit across 8 viewports and 8 pages...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const report = {
    timestamp: new Date().toISOString(),
    viewportsTested: viewports.map(v => v.name),
    pagesTested: pages.map(p => p.path),
    overflows: [],
    tinyText: [],
    tapTargetIssues: [],
    navigationChecks: {},
  };

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
    });
    const page = await context.newPage();

    for (const p of pages) {
      const url = `http://127.0.0.1:3000${p.path}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      // 1. Check Horizontal Overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const culprits = [];
        if (docWidth > winWidth) {
          const elements = document.querySelectorAll('*');
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1) {
              culprits.push({
                tag: el.tagName,
                className: typeof el.className === 'string' ? el.className : '',
                id: el.id,
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          }
        }
        return { hasOverflow: docWidth > winWidth, docWidth, winWidth, culprits: culprits.slice(0, 5) };
      });

      if (overflow.hasOverflow) {
        report.overflows.push({ viewport: vp.name, page: p.path, details: overflow });
      }

      // 2. Check Text Readability (under 11.5px for body prose/labels)
      const tiny = await page.evaluate(() => {
        const textNodes = document.querySelectorAll('p, a, span:not(.badge):not(.tag-chip):not(.sr-only), li, label, input, button');
        const list = [];
        for (const el of textNodes) {
          if (el.offsetParent === null) continue;
          const text = el.innerText ? el.innerText.trim() : '';
          if (text.length < 4) continue;
          const fs = parseFloat(window.getComputedStyle(el).fontSize);
          if (fs < 11.5) {
            list.push({
              tag: el.tagName,
              text: text.slice(0, 35),
              fontSize: `${fs}px`,
              className: typeof el.className === 'string' ? el.className : ''
            });
          }
        }
        return list.slice(0, 5);
      });

      if (tiny.length > 0) {
        report.tinyText.push({ viewport: vp.name, page: p.path, items: tiny });
      }

      // 3. Check interactive button and link tap targets (< 40px in mobile <= 430px)
      if (vp.width <= 430) {
        const smallTargets = await page.evaluate(() => {
          const interactives = document.querySelectorAll('button:not(.back-to-top-button), a.button, a.nav-link, .menu-toggle, .whatsapp-float, input, select, textarea');
          const bad = [];
          for (const el of interactives) {
            if (el.offsetParent === null) continue;
            const rect = el.getBoundingClientRect();
            if (rect.height < 40 || rect.width < 40) {
              bad.push({
                tag: el.tagName,
                text: el.innerText ? el.innerText.trim().slice(0, 25) : '',
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                className: typeof el.className === 'string' ? el.className : ''
              });
            }
          }
          return bad;
        });

        if (smallTargets.length > 0) {
          report.tapTargetIssues.push({ viewport: vp.name, page: p.path, items: smallTargets });
        }
      }

      // Capture screenshot for key viewports
      if (['width-320', 'width-375', 'width-412', 'width-768'].includes(vp.name)) {
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${vp.name}-${p.name}.png`),
          fullPage: true
        });
      }
    }

    // Navigation interaction test on homepage
    if (vp.width <= 768) {
      await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
      const toggle = page.locator('.menu-toggle');
      const isVisible = await toggle.isVisible();
      if (isVisible) {
        await toggle.click();
        await page.waitForTimeout(200);
        const menuVisible = await page.locator('#mobile-nav').isVisible();
        const menuCount = await page.locator('#mobile-nav a').count();
        report.navigationChecks[vp.name] = { toggleVisible: true, menuOpens: menuVisible, linksCount: menuCount };
      }
    }

    await context.close();
  }

  await browser.close();
  fs.writeFileSync('tests/mobile-audit-report.json', JSON.stringify(report, null, 2));
  console.log(`Audit complete: Overflows = ${report.overflows.length}, TinyText = ${report.tinyText.length}, TapIssues = ${report.tapTargetIssues.length}`);
}

runMobileAudit().catch(console.error);
