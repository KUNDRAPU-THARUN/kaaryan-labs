import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200);
const html = await response.text();
for (const id of ['home', 'about', 'divisions', 'expertise', 'process', 'contact']) assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
assert.ok(html.includes('Project inquiries are not available yet'), 'Run this smoke test without a contact provider configured.');
for (const logo of ['horizontal', 'primary']) assert.equal((await fetch(`${base}/brand/kaaryan-logo-${logo}.jpeg`)).status, 200);
const payload = { name: 'Test Person', email: 'test@example.com', company: '', projectType: 'Web Application', description: 'This is a local validation test inquiry.', website: '' };
async function post(body, expected, extraHeaders = {}) {
  const result = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'content-type': 'application/json', ...extraHeaders }, body: JSON.stringify(body) });
  assert.equal(result.status, expected, await result.text());
}
await post(payload, 403, { origin: 'https://unrelated.example' });
await post({ ...payload, email: 'invalid' }, 400);
await post({ ...payload, website: 'spam' }, 400);
await post(payload, 503);
await post(payload, 503);
await post(payload, 503);
await post(payload, 429);
console.log('PASS: page, six anchor targets, original logos, validation, honeypot, origin protection, missing-provider response and rate limit.');
