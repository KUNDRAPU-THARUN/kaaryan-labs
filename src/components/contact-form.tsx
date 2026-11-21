'use client';
import { useState } from 'react';
import { ArrowRight, LoaderCircle, CheckCircle2, AlertCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { projectTypes, COMPANY } from '@/lib/content';

export function ContactForm({
  configured,
  defaultService = '',
}: {
  configured: boolean;
  defaultService?: string;
}) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || pending) return;

    setPending(true);
    setStatus('');
    setSuccess(false);

    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setStatus(result.message || 'The submission could not be confirmed. Please try again.');
      if (response.ok) {
        setSuccess(true);
        form.reset();
      }
    } catch {
      setStatus('We could not connect to the server. Please try again shortly or reach us via WhatsApp.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-label="Project inquiry" aria-busy={pending}>
      <div className="form-heading">
        <h3>Tell us what you have in mind</h3>
        <p>Share a few details about your project or problem, and we will get back to you with clarity and next steps.</p>
      </div>

      <div className="form-row">
        <label>
          Full Name <span className="req" aria-hidden="true">*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            maxLength={120}
          />
        </label>
        <label>
          Email Address <span className="req" aria-hidden="true">*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone Number <span className="opt">(Optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            maxLength={50}
          />
        </label>
        <label>
          Company / Startup Name <span className="opt">(Optional)</span>
          <input
            name="company"
            autoComplete="organization"
            placeholder="Your business or idea name"
            maxLength={160}
          />
        </label>
      </div>

      <div className="form-row">
        <label className="project-type">
          Service Interested In <span className="req" aria-hidden="true">*</span>
          <select name="projectType" required defaultValue={defaultService}>
            <option value="" disabled>Select a service</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Preferred Contact Method <span className="opt">(Optional)</span>
          <select name="preferredMethod" defaultValue="WhatsApp">
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Phone call">Phone Call</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Expected Timeline <span className="opt">(Optional)</span>
          <select name="timeline" defaultValue="Flexible">
            <option value="Flexible">Flexible / Exploring</option>
            <option value="Under 1 month">Urgent (Under 1 month)</option>
            <option value="1 - 3 months">Standard (1 - 3 months)</option>
            <option value="3 - 6 months">Long-term (3 - 6 months)</option>
          </select>
        </label>
        <label>
          Budget Range <span className="opt">(Optional)</span>
          <select name="budget" defaultValue="Discuss with team">
            <option value="Discuss with team">Open to discuss</option>
            <option value="₹25,000 - ₹50,000">₹25,000 – ₹50,000</option>
            <option value="₹50,000 - ₹2,00,000">₹50,000 – ₹2,00,000</option>
            <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 – ₹5,00,000</option>
            <option value="₹5,00,000+">₹5,00,000+ / Custom</option>
          </select>
        </label>
      </div>

      <div className="message-row">
        <label>
          Project Description <span className="req" aria-hidden="true">*</span>
          <textarea
            name="description"
            placeholder="Describe the problem you are looking to solve, your vision, or key requirements..."
            aria-describedby="description-hint"
            required
            minLength={20}
            maxLength={5000}
            rows={4}
          />
          <span id="description-hint" className="field-hint">
            Please share at least 20 characters so we can understand your requirements.
          </span>
        </label>
      </div>

      <div className="honeypot" aria-hidden="true" style={{ display: 'none' }}>
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="privacy">
        Your details are treated confidentially and used solely to respond to your inquiry. We never spam or sell your information.
      </p>

      {!configured && (
        <p className="configuration-note">
          Project inquiries are not available yet. The contact service is awaiting configuration.
        </p>
      )}

      <div className="form-submit-bar">
        <button
          className="button form-submit-btn"
          type="submit"
          disabled={pending || !configured}
        >
          {pending ? 'Sending…' : 'Send Message'}
          {pending ? (
            <LoaderCircle className="spinner" size={18} />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </div>

      {status && (
        <p
          role="status"
          aria-live="polite"
          className={success ? 'form-status success' : 'form-status error'}
        >
          {success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{status}</span>
        </p>
      )}

      <div className="direct-reachout">
        <p className="reachout-text">Prefer immediate discussion?</p>
        <div className="reachout-chips">
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reachout-chip whatsapp"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a href={COMPANY.phoneTel} className="reachout-chip">
            <Phone size={14} /> {COMPANY.phone}
          </a>
          <a href={COMPANY.emailMailto} className="reachout-chip">
            <Mail size={14} /> {COMPANY.email}
          </a>
        </div>
      </div>
    </form>
  );
}
