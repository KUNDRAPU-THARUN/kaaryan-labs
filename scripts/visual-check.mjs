import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
// Playwright discovers Chrome on Windows, macOS and Linux. A custom executable
// can still be selected explicitly; bundled Chromium is the final fallback.
const browser = process.env.CHROME_PATH
  ? await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true })
  : await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }));
try {
await mkdir('design/qa', { recursive: true });
const page = await browser.newPage({ viewport: { width: 1122, height: 1402 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto(base, { waitUntil: 'networkidle', timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'design/qa/desktop-1122.png', fullPage: true });
const sections = await page.locator('main section[id]').evaluateAll(elements => elements.map(element => ({ id: element.id, y: Math.round(element.getBoundingClientRect().top + window.scrollY), height: Math.round(element.getBoundingClientRect().height) })));
const widths = [1920, 1440, 1366, 1024, 768, 430, 375, 320];
for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(dimensions.document <= dimensions.viewport, `Horizontal overflow at ${width}: ${JSON.stringify(dimensions)}`);
  const heading = page.locator('h1');
  assert.ok(await heading.evaluate(element => element.scrollWidth <= element.clientWidth + 1), `Hero headline clips at ${width}`);
  for (const card of await page.locator('.division-card').all()) {
    const overlaps = await card.evaluate(element => {
      const text = element.querySelector('.division-copy').getBoundingClientRect();
      const arrow = element.querySelector('.circle-arrow').getBoundingClientRect();
      return text.right - 35 > arrow.left && text.left < arrow.right && text.bottom > arrow.top && text.top < arrow.bottom;
    });
    assert.equal(overlaps, false, `Division text and arrow overlap at ${width}`);
  }
  if (width === 1440 || width === 375 || width === 320) await page.screenshot({ path: `design/qa/${width < 640 ? 'mobile' : 'desktop'}-${width}.png`, fullPage: true });
}
await page.setViewportSize({ width: 375, height: 812 });
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.locator('#mobile-nav').waitFor();
await page.keyboard.press('Escape');
await page.locator('#mobile-nav').waitFor({ state: 'detached' });
assert.equal(await page.getByRole('button', { name: 'Open navigation' }).evaluate(element => element === document.activeElement), true);
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.locator('#mobile-nav').getByRole('link', { name: 'About', exact: true }).click();
await page.locator('#mobile-nav').waitFor({ state: 'detached' });
assert.equal(new URL(page.url()).hash, '#about');
await page.setViewportSize({ width: 1122, height: 900 });
for (const [title, hash] of [['Home','#home'],['About','#about'],['What We Do','#divisions'],['Our Process','#process'],['Insights','#insights'],['Contact','#contact']]) {
  assert.equal(await page.locator(hash).count(), 1);
  const link = page.locator('.desktop-links').getByRole('link', { name: title, exact: true });
  await link.click();
  await page.waitForTimeout(50);
  assert.equal(await link.getAttribute('aria-current'), 'location');
}
const form = page.getByRole('form', { name: 'Project inquiry' });
assert.equal(await form.getByRole('button', { name: 'Send Message' }).isDisabled(), true);
await form.locator('input[name=name]').fill('Test Person');
await form.locator('input[name=email]').fill('invalid');
assert.equal(await form.evaluate(element => element.checkValidity()), false);
await form.locator('input[name=email]').fill('test@example.com');
await form.locator('textarea').fill('A meaningful local test of a software project.');
assert.equal(await form.evaluate(element => element.checkValidity()), false);
await form.locator('select').selectOption('Web Application');
assert.equal(await form.evaluate(element => element.checkValidity()), true);
assert.equal(await form.locator('select').inputValue(), 'Web Application');
assert.deepEqual(errors, [], 'Browser console/runtime errors');
assert.ok(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'All image assets must load');
await writeFile('design/qa/report.json', JSON.stringify({ checkedWidths: widths, sections, browserErrors: errors, mobileMenu: 'passed', formValidation: 'passed', contactWithoutProvider: 'disabled', screenshots: ['desktop-1122.png', 'desktop-1440.png', 'mobile-375.png', 'mobile-320.png'] }, null, 2));
console.log('PASS: desktop/mobile screenshots, eight responsive widths, mobile navigation, Escape focus return, anchor targets, form validation and no browser errors.');
} finally { await browser.close(); }
