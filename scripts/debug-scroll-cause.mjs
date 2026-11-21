import { chromium } from '@playwright/test';

async function debugScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    window.__scrollEvents = [];
    window.__calls = [];

    const origScrollTo = window.scrollTo;
    window.scrollTo = function(...args) {
      window.__calls.push({ fn: 'scrollTo', args, stack: new Error().stack });
      return origScrollTo.apply(this, args);
    };

    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(...args) {
      window.__calls.push({ fn: 'scrollIntoView', el: this.tagName + (this.id ? '#' + this.id : '') + (this.className ? '.' + this.className : ''), args, stack: new Error().stack });
      return origScrollIntoView.apply(this, args);
    };

    const origFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function(...args) {
      window.__calls.push({ fn: 'focus', el: this.tagName + (this.id ? '#' + this.id : '') + (this.className ? '.' + this.className : ''), args, stack: new Error().stack });
      return origFocus.apply(this, args);
    };

    window.addEventListener('scroll', (e) => {
      window.__scrollEvents.push({
        type: 'scroll',
        y: window.scrollY,
        time: performance.now(),
      });
    }, { passive: true });
  });

  console.log('Navigating to http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // Scroll down to 1500
  console.log('Scrolling down to 1500...');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(200);

  // Clear events
  await page.evaluate(() => window.__scrollEvents = []);

  console.log('Clicking About Us in desktop-links...');
  // Use page.evaluate to click to avoid Playwright auto-scrolling
  await page.evaluate(() => {
    const link = document.querySelector('.desktop-links a[href="/about-us"]');
    link.click();
  });

  // Track over next 2 seconds
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(200);
    const state = await page.evaluate(() => ({
      url: window.location.href,
      scrollY: window.scrollY,
      docHeight: document.documentElement.scrollHeight,
      eventsCount: window.__scrollEvents.length,
      recentEvents: window.__scrollEvents.slice(-5)
    }));
    console.log(`t=${(i+1)*200}ms: URL=${state.url}, scrollY=${state.scrollY}, docHeight=${state.docHeight}`);
  }

  const calls = await page.evaluate(() => window.__calls);
  console.log('\nTotal function calls intercepted:', calls.length);
  for (const c of calls) {
    console.log(`Call: ${c.fn} on ${c.el || 'window'} with args:`, c.args);
    console.log(c.stack);
  }

  const allEvents = await page.evaluate(() => window.__scrollEvents);
  console.log('\nTotal scroll events recorded:', allEvents.length);
  for (const ev of allEvents.slice(0, 15)) {
    console.log(`Event at t=${ev.time.toFixed(1)}ms: y=${ev.y}`);
  }

  await browser.close();
}

debugScroll().catch(console.error);
