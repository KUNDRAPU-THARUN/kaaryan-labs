import { Navigation } from '@/components/navigation';
import { Hero, TrustStrip, About, Divisions, Expertise, Workflow, Principles, Contact, Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
export default function Home() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main"><Hero/><TrustStrip/><About/><Divisions/><Expertise/><Workflow/><Principles/><Contact configured={Boolean(process.env.CONTACT_FORM_ENDPOINT)}/></main><Footer/><Reveal/></>;
}
