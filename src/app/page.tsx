import { Navigation } from '@/components/navigation';
import {
  Hero,
  TrustStrip,
  About,
  Divisions,
  Expertise,
  WhyChooseUsSection,
  Workflow,
  StartupSupportSection,
  InsightsHome,
  Contact,
  Footer,
} from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { COMPANY } from '@/lib/content';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  url: COMPANY.websiteUrl,
  logo: `${COMPANY.websiteUrl}brand/kaaryan-mark.png`,
  description: COMPANY.description,
  slogan: COMPANY.tagline,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  sameAs: [COMPANY.linkedinUrl, COMPANY.instagramUrl],
  knowsAbout: [
    'Software product development',
    'Custom software development',
    'Research as a Service (RaaS)',
    'AI as a Service (AaaS)',
    'Web applications',
    'Mobile applications',
    'UI/UX design',
    'Startup and founder support',
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Divisions />
        <Expertise />
        <WhyChooseUsSection />
        <Workflow />
        <StartupSupportSection />
        <InsightsHome />
        <Contact configured={Boolean(process.env.CONTACT_FORM_ENDPOINT)} />
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
