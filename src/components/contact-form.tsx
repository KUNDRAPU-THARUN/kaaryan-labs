'use client';
import { useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { projectTypes } from '@/lib/content';
export function ContactForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setPending(true); setStatus(''); setSuccess(false);
    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      setStatus(result.message);
      if (response.ok) { setSuccess(true); form.reset(); }
    } catch { setStatus('We could not connect. Please try again shortly.'); }
    finally { setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120}/></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label></div>
    <div className="form-row"><label>Company / organization <small>(optional)</small><input name="company" autoComplete="organization" placeholder="Where you work" maxLength={160}/></label><label>Project type <span>*</span><select name="projectType" required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></label></div>
    <label>Tell us about your project <span>*</span><textarea name="description" placeholder="What problem are you looking to solve?" required minLength={20} maxLength={5000} rows={4}/></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p className="privacy">We use the information you share to respond to your inquiry. Please do not include sensitive or confidential information.</p>
    {!configured && <p className="configuration-note">Project inquiries are not available yet. The contact service is awaiting configuration.</p>}
    <button className="button" type="submit" disabled={pending || !configured}>{pending ? 'Sending…' : 'Send Project Inquiry'}{pending ? <LoaderCircle className="spinner" size={17}/> : <ArrowUpRight size={17}/>}</button>
    <p role="status" aria-live="polite" className={success ? 'form-status success' : 'form-status'}>{status}</p>
  </form>;
}
