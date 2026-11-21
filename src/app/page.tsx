import { Navigation } from '@/components/navigation';
import { Hero, TrustStrip, About, Divisions, Expertise, Workflow, Principles, Contact, Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kaaryan Labs',
  url: 'https://kaaryanlabs.in/',
  logo: 'https://kaaryanlabs.in/brand/kaaryan-mark.png',
  description: 'Research-driven digital products and custom software solutions, built to turn complex problems into practical, real-world impact.',
  knowsAbout: ['Software product development', 'Custom software development', 'Product engineering', 'Web applications', 'Mobile applications', 'Artificial intelligence'],
};
export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}/><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main"><Hero/><TrustStrip/><About/><Divisions/><Expertise/><Workflow/><Principles/><Contact configured={Boolean(process.env.CONTACT_FORM_ENDPOINT)}/></main><Footer/><Reveal/></>;
}
