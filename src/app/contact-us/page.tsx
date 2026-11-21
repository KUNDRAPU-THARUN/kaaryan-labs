import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { ContactForm } from '@/components/contact-form';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { COMPANY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact Us | KAARYAN LABS — Let’s Build Something Meaningful',
  description:
    'Get in touch with KAARYAN LABS. Reach us by phone (+91 9493934972), email (contact@kaaryanlabs.in), WhatsApp, or submit our detailed project inquiry form.',
  alternates: { canonical: '/contact-us' },
};

interface Props {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactUsPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="subpage">
        {/* Page Header */}
        <header className="page-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact Us</span>
            </nav>
            <p className="eyebrow">START A CONVERSATION</p>
            <h1>Let’s Turn Your Problem Into Possibility</h1>
            <p className="page-intro">
              Whether you are looking to develop a custom web platform, integrate practical AI workflows,
              conduct deep market research, or launch a new startup venture, we are ready to listen.
            </p>
          </div>
        </header>

        {/* Contact Layout */}
        <section className="section bg-white">
          <div className="container contact-page-grid">
            {/* Left: Contact Info & Channels */}
            <div className="contact-info-col reveal">
              <span className="badge">DIRECT CHANNELS</span>
              <h2>Official Company Contact Details</h2>
              <p>
                Reach out through your preferred channel. We respond promptly with technical clarity
                and transparent recommendations.
              </p>

              <div className="contact-cards-stack">
                {/* WhatsApp */}
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-box whatsapp"
                >
                  <span className="round-icon whatsapp-bg">
                    <MessageCircle size={22} />
                  </span>
                  <div>
                    <strong>WhatsApp Direct Support</strong>
                    <span className="channel-value">+91 9493934972</span>
                    <span className="channel-note">Click for immediate conversation</span>
                  </div>
                  <ExternalLink size={16} className="card-external-arrow" />
                </a>

                {/* Phone */}
                <a href={COMPANY.phoneTel} className="contact-card-box">
                  <span className="round-icon">
                    <Phone size={22} />
                  </span>
                  <div>
                    <strong>Direct Phone Call</strong>
                    <span className="channel-value">{COMPANY.phone}</span>
                    <span className="channel-note">Available Mon – Sat, 9:00 AM – 7:00 PM IST</span>
                  </div>
                </a>

                {/* Email */}
                <a href={COMPANY.emailMailto} className="contact-card-box">
                  <span className="round-icon">
                    <Mail size={22} />
                  </span>
                  <div>
                    <strong>Official Email Address</strong>
                    <span className="channel-value">{COMPANY.email}</span>
                    <span className="channel-note">For formal proposals, inquiries & RFP documents</span>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="social-block-card">
                <h3>Connect on Social Media</h3>
                <p>Stay informed about our latest articles, technology releases, and research updates.</p>
                <div className="social-buttons-row">
                  <a
                    href={COMPANY.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn linkedin"
                  >
                    LinkedIn Profile <ExternalLink size={13} />
                  </a>
                  <a
                    href={COMPANY.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                  >
                    Instagram Profile <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Transparency Promise */}
              <div className="transparency-note">
                <ShieldCheck size={20} />
                <div>
                  <strong>Our Privacy & Professional Promise</strong>
                  <p>
                    All project briefs, problem descriptions, and discussions are kept strictly confidential.
                    We never sell your contact information or send unsolicited sales campaigns.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Inquiry Form */}
            <div className="contact-form-col reveal">
              <ContactForm
                configured={Boolean(process.env.CONTACT_FORM_ENDPOINT)}
                defaultService={service || ''}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
