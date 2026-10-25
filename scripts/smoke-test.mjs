import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const response = await fetch(base);
assert.equal(response.status, 200);
const html = await response.text();
for (const id of ['home', 'about', 'divisions', 'expertise', 'process', 'contact']) assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
assert.ok(html.includes('Project inquiries are not available yet'), 'Run this smoke test without a contact provider configured.');
for (const logo of ['horizontal', 'primary']) assert.equal((await fetch(`${base}/brand/kaaryan-logo-${logo}.jpeg`)).status, 200);
const payload = { name: 'Test Person', email: 'test@example.com', company: '', projectType: 'Web Application', description: 'This is a local validation test inquiry.', website: '' };
const testClient = `local-smoke-${crypto.randomUUID()}`;
async function post(body, expected, extraHeaders = {}) {
  const result = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': testClient, ...extraHeaders }, body: JSON.stringify(body) });
  assert.equal(result.status, expected, await result.text());
}
await post(payload, 403, { origin: 'https://unrelated.example' });
await post({ ...payload, email: 'invalid' }, 400);
await post({ ...payload, website: 'spam' }, 400);
await post(payload, 503);
await post(payload, 503);
await post(payload, 503);
await post(payload, 429);
const validationHeaders = { 'content-type': 'application/json', 'x-forwarded-for': `local-validation-${crypto.randomUUID()}` };
for (const body of ['null', '{broken', JSON.stringify({ ...payload, description: 'x'.repeat(16_001) }), JSON.stringify({ ...payload, description: '界'.repeat(6000) })]) {
  const result = await fetch(`${base}/api/contact`, { method: 'POST', headers: validationHeaders, body });
  assert.equal(result.status, body.length > 16_000 || body.includes('界') ? 413 : 400);
}
// No Content-Length: verify that streamed payloads receive the same byte limit.
const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(JSON.stringify({ ...payload, description: 'x'.repeat(17_000) }))); controller.close(); } });
const streamed = await fetch(`${base}/api/contact`, { method: 'POST', headers: validationHeaders, body: stream, duplex: 'half' });
assert.equal(streamed.status, 413);
console.log('PASS: page, six anchor targets, original logos, validation, honeypot, origin protection, missing-provider response, rate limit, malformed JSON and byte-limited streaming.');
