import { chromium } from '@playwright/test';

async function testAnchors() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Testing anchor navigation...');
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });

  // Test 1: Click "Explore Division" on division 01 -> /services#technology-software
  console.log('\n--- Test 1: Click /services#technology-software from home ---');
  const divLink = page.locator('a[href="/services#technology-software"]').first();
  await divLink.click();
  await page.waitForTimeout(800);
  let state = await page.evaluate(() => {
    const target = document.getElementById('technology-software');
    const header = document.querySelector('.header');
    const targetRect = target?.getBoundingClientRect();
    const headerRect = header?.getBoundingClientRect();
    return {
      url: window.location.href,
      scrollY: window.scrollY,
      targetFound: !!target,
      targetTop: targetRect?.top,
      headerBottom: headerRect?.bottom,
      isCovered: targetRect ? targetRect.top < headerRect.bottom : null
    };
  });
  console.log('Result for /services#technology-software:', state);

  // Test 2: On /services, click an internal category link
  console.log('\n--- Test 2: On /services, click #research-as-a-service ---');
  await page.evaluate(() => {
    const link = document.querySelector('a[href="#research-as-a-service"]');
    if (link) link.click();
  });
  await page.waitForTimeout(800);
  state = await page.evaluate(() => {
    const target = document.getElementById('research-as-a-service');
    const header = document.querySelector('.header');
    const targetRect = target?.getBoundingClientRect();
    const headerRect = header?.getBoundingClientRect();
    return {
      url: window.location.href,
      scrollY: window.scrollY,
      targetFound: !!target,
      targetTop: targetRect?.top,
      headerBottom: headerRect?.bottom,
      isCovered: targetRect ? targetRect.top < headerRect.bottom : null
    };
  });
  console.log('Result for #research-as-a-service:', state);

  await browser.close();
}

testAnchors().catch(console.error);
