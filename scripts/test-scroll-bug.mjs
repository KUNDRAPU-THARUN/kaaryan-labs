import { chromium } from '@playwright/test';

async function testScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to homepage...');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  console.log('Initial Home scrollY:', await page.evaluate(() => window.scrollY));

  // Test 1: Scroll halfway down homepage, then click "About Us"
  console.log('\n--- Test 1: Scroll halfway down homepage (1500px), then click "About Us" ---');
  await page.evaluate(() => window.scrollTo(0, 1500));
  console.log('Scrolled to:', await page.evaluate(() => window.scrollY));

  // Click About Us in header
  const aboutLink = page.locator('.desktop-links a[href="/about-us"]');
  await aboutLink.click();
  await page.waitForTimeout(1000);
  let scrollY = await page.evaluate(() => window.scrollY);
  let url = page.url();
  console.log(`After clicking About Us: URL=${url}, scrollY=${scrollY}`);

  // Test 2: Scroll down on About Us, then click "Services"
  console.log('\n--- Test 2: Scroll down to 1000px on About Us, then click "Services" ---');
  await page.evaluate(() => window.scrollTo(0, 1000));
  const servicesLink = page.locator('.desktop-links a[href="/services"]');
  await servicesLink.click();
  await page.waitForTimeout(1000);
  scrollY = await page.evaluate(() => window.scrollY);
  url = page.url();
  console.log(`After clicking Services: URL=${url}, scrollY=${scrollY}`);

  // Test 3: Click "Our Process"
  console.log('\n--- Test 3: Click "Our Process" ---');
  const processLink = page.locator('.desktop-links a[href="/our-process"]');
  await processLink.click();
  await page.waitForTimeout(1000);
  scrollY = await page.evaluate(() => window.scrollY);
  url = page.url();
  console.log(`After clicking Our Process: URL=${url}, scrollY=${scrollY}`);

  // Test 4: Click "Home"
  console.log('\n--- Test 4: Scroll down, click "Home" ---');
  await page.evaluate(() => window.scrollTo(0, 2000));
  const homeLink = page.locator('.desktop-links a[href="/"]');
  await homeLink.click();
  await page.waitForTimeout(1000);
  scrollY = await page.evaluate(() => window.scrollY);
  url = page.url();
  console.log(`After clicking Home: URL=${url}, scrollY=${scrollY}`);

  // Test 5: Click "Start a Project" (CTA)
  console.log('\n--- Test 5: Click "Start a Project" ---');
  await page.evaluate(() => window.scrollTo(0, 2000));
  const ctaLink = page.locator('.nav-cta');
  await ctaLink.click();
  await page.waitForTimeout(1000);
  scrollY = await page.evaluate(() => window.scrollY);
  url = page.url();
  console.log(`After clicking Start a Project: URL=${url}, scrollY=${scrollY}`);

  await browser.close();
}

testScroll().catch(console.error);
