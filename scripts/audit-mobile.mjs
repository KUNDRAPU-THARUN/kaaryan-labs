import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_DIR = path.resolve('tests/screenshots/mobile');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function auditMobile() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const viewports = [
    { name: 'iphone-se-375', width: 375, height: 667 },
    { name: 'small-mobile-320', width: 320, height: 568 },
    { name: 'android-412', width: 412, height: 915 },
  ];

  const pages = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about-us' },
    { name: 'services', path: '/services' },
    { name: 'process', path: '/our-process' },
    { name: 'startup', path: '/startup-support' },
    { name: 'insights', path: '/insights' },
    { name: 'contact', path: '/contact-us' },
  ];

  const report = {
    overflows: [],
    tapTargets: [],
    mobileMenu: {},
    textSizes: []
  };

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const p of pages) {
      await page.goto(`http://127.0.0.1:3000${p.path}`, { waitUntil: 'networkidle' });

      // Check horizontal overflow
      const overflowInfo = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const overflowingElements = [];

        if (docWidth > winWidth) {
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1) {
              overflowingElements.push({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          }
        }
        return { docWidth, winWidth, hasOverflow: docWidth > winWidth, overflowingElements: overflowingElements.slice(0, 10) };
      });

      if (overflowInfo.hasOverflow) {
        report.overflows.push({ viewport: vp.name, page: p.path, overflowInfo });
      }

      // Check text readability (font size < 11px on body or paragraphs)
      const tinyText = await page.evaluate(() => {
        const pTags = document.querySelectorAll('p, span, a, li, label');
        const tiny = [];
        for (const el of pTags) {
          // ignore hidden or decorative
          if (el.offsetParent === null) continue;
          const s = window.getComputedStyle(el);
          const fs = parseFloat(s.fontSize);
          if (fs < 11 && el.innerText.trim().length > 3) {
            tiny.push({
              tag: el.tagName,
              text: el.innerText.trim().slice(0, 30),
              fontSize: s.fontSize,
              className: el.className
            });
          }
        }
        return tiny.slice(0, 5);
      });

      if (tinyText.length > 0) {
        report.textSizes.push({ viewport: vp.name, page: p.path, tinyText });
      }

      // Capture screenshot
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${vp.name}-${p.name}.png`),
        fullPage: true
      });
    }

    // On home, test mobile menu interaction
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
    const toggle = page.locator('.menu-toggle');
    const isToggleVisible = await toggle.isVisible();
    const toggleBox = await toggle.boundingBox();

    await toggle.click();
    await page.waitForTimeout(300);

    const mobileMenu = page.locator('#mobile-nav');
    const isMenuVisible = await mobileMenu.isVisible();
    const menuLinks = await page.locator('#mobile-nav a').count();

    // Screenshot open mobile menu
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${vp.name}-menu-open.png`)
    });

    report.mobileMenu[vp.name] = {
      isToggleVisible,
      toggleBox,
      isMenuVisible,
      menuLinks
    };

    await page.close();
  }

  await browser.close();
  fs.writeFileSync('tests/mobile-audit-report.json', JSON.stringify(report, null, 2));
  console.log('Mobile audit finished!');
  console.log('Overflows detected:', report.overflows.length);
  if (report.overflows.length > 0) {
    console.log(JSON.stringify(report.overflows, null, 2));
  }
  console.log('Tiny text items found:', report.textSizes.length);
  if (report.textSizes.length > 0) {
    console.log(JSON.stringify(report.textSizes, null, 2));
  }
  console.log('Mobile menu report:', JSON.stringify(report.mobileMenu, null, 2));
}

auditMobile().catch(console.error);
