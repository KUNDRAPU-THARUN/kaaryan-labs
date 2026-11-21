import { NextRequest, NextResponse } from 'next/server';
import { projectTypes } from '@/lib/content';

export const runtime = 'nodejs';
// A single-process safeguard. Use a shared rate-limit store at the hosting edge for multi-instance deployments.
const attempts = new Map<string, { count: number; reset: number }>();
const reply = (message: string, status: number) => NextResponse.json({ message }, { status });

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return reply('Submission origin is not allowed.', 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return reply('Please submit a JSON request.', 415);

  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  for (const [address, entry] of attempts) if (entry.reset < now) attempts.delete(address);
  const entry = attempts.get(key) || { count: 0, reset: now + 600_000 };
  if (entry.count >= 5) return reply('Too many attempts. Please wait ten minutes before trying again.', 429);
  entry.count++; attempts.set(key, entry);

  let data: Record<string, unknown>;
  try {
    // Bound incoming bytes while reading, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply('We could not read your inquiry.', 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 16_000) {
          await reader.cancel();
          return reply('Your inquiry is too large.', 413);
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const body = Buffer.concat(chunks, size).toString('utf8');
    data = JSON.parse(body);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid payload');
  } catch { return reply('We could not read your inquiry.', 400); }

  if (data.website) return reply('Submission could not be accepted.', 400);

  const { name, email, phone, company, projectType, description, timeline, budget, preferredMethod } = data;

  if (
    typeof name !== 'string' || !name.trim() || name.length > 120 ||
    typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof description !== 'string' || description.trim().length < 20 || description.length > 5000 ||
    typeof projectType !== 'string' || !projectTypes.includes(projectType) ||
    (company !== undefined && (typeof company !== 'string' || company.length > 160)) ||
    (phone !== undefined && (typeof phone !== 'string' || phone.length > 50)) ||
    (timeline !== undefined && (typeof timeline !== 'string' || timeline.length > 100)) ||
    (budget !== undefined && (typeof budget !== 'string' || budget.length > 100)) ||
    (preferredMethod !== undefined && (typeof preferredMethod !== 'string' || preferredMethod.length > 50))
  ) {
    return reply('Please check your name, email, project type and description (at least 20 characters).', 400);
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return reply('The contact service is not configured yet. Your inquiry has not been sent.', 503);

  try {
    if (new URL(endpoint).protocol !== 'https:') throw new Error('HTTPS required');
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CONTACT_FORM_API_KEY ? { Authorization: `Bearer ${process.env.CONTACT_FORM_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === 'string' ? phone.trim() : '',
        company: typeof company === 'string' ? company.trim() : '',
        projectType,
        description: description.trim(),
        timeline: typeof timeline === 'string' ? timeline.trim() : '',
        budget: typeof budget === 'string' ? budget.trim() : '',
        preferredMethod: typeof preferredMethod === 'string' ? preferredMethod.trim() : 'Email',
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: 'error',
    });

    if (!result.ok) return reply('The contact service could not accept your inquiry. Please try again later.', 502);
    return reply('Your inquiry has been received. Thank you for sharing your project with Kaaryan Labs.', 200);
  } catch {
    return reply('The contact service is temporarily unavailable. Your submission could not be confirmed.', 502);
  }
}
