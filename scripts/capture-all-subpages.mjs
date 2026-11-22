import { chromium } from '@playwright/test';

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const subpages = ['about-us', 'services', 'our-process', 'contact-us', 'insights'];
  
  for (const sp of subpages) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto(`http://127.0.0.1:3000/${sp}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const totalHeight = document.body.scrollHeight;
      for (let y = 0; y < totalHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: `tests/screenshots/mobile-audit/${sp}-375px.png`, fullPage: true });
    console.log(`Captured ${sp}`);
    await page.close();
  }
  await browser.close();
}

run().catch(console.error);
