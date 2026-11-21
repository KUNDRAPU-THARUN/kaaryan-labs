'use client';
import { useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { projectTypes } from '@/lib/content';
export function ContactForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget;
    if (!form.reportValidity() || pending) return;
    setPending(true); setStatus(''); setSuccess(false);
    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      setStatus(result.message || 'The submission could not be confirmed. Please try again.');
      if (response.ok) { setSuccess(true); form.reset(); }
    } catch { setStatus('We could not connect. Please try again shortly.'); }
    finally { setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit} aria-label="Project inquiry" aria-busy={pending}>
    <div className="form-heading"><h3>Tell us what you have in mind.</h3><p>A few details are all we need to start.</p></div>
    <div className="form-row"><label>Full Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120}/></label><label>Email Address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label></div>
    <label className="project-type">Project Type <span aria-hidden="true">*</span><select name="projectType" required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></label>
    <div className="message-row"><label>Project Description <span aria-hidden="true">*</span><textarea name="description" placeholder="What problem are you looking to solve?" aria-describedby="description-hint" required minLength={20} maxLength={5000} rows={5}/><span id="description-hint" className="field-hint">Please share at least 20 characters.</span></label><button className="button" type="submit" disabled={pending || !configured}>{pending ? 'Sending…' : 'Send Message'}{pending ? <LoaderCircle className="spinner" size={18}/> : <ArrowRight size={18}/>}</button></div>
    <input name="company" type="hidden" value=""/>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p className="privacy">Your details are used only to respond to your inquiry. Please don’t include confidential information.</p>
    <p role="status" aria-live="polite" className={success ? 'form-status success' : 'form-status'}>{status}</p>
  </form>;
}
