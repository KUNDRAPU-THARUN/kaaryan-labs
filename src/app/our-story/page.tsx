import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { WhatsAppButton } from '@/components/whatsapp-button';

export const metadata: Metadata = {
  title: 'Our Story | KAARYAN LABS — Purpose, Origin & Approach',
  description:
    'Why KAARYAN LABS began: understanding the everyday problems businesses and people live with, then engineering software to turn them into possibilities.',
  alternates: { canonical: '/our-story' },
};

const chapters = [
  ['The problems we see', '#everyday-problems'],
  ['Why we started now', '#why-now'],
  ['Understanding comes first', '#understanding-first'],
  ['The difference we want to make', '#our-purpose'],
];

export default function OurStoryPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="story-page">
        <header className="story-hero">
          <div className="container">
            <nav className="story-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/about-us">About Us</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Our Story</span>
            </nav>
            <p className="eyebrow">OUR STORY</p>
            <h1>Progress begins with a problem worth solving.</h1>
            <p className="story-intro">
              We started KAARYAN LABS to understand the challenges people have learned to live with, and build software and research that helps them move beyond them.
            </p>
            <div className="story-meta">
              <span>The purpose behind KAARYAN LABS</span>
              <span>3 minute read</span>
            </div>
          </div>
        </header>

        <article className="container story-layout">
          <nav className="story-toc" aria-label="In this story">
            <p>IN THIS STORY</p>
            {chapters.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="story-article">
            <section id="everyday-problems" className="story-section">
              <p className="story-kicker">01 / THE BEGINNING</p>
              <h2>The problems we learn to live with.</h2>
              <p>
                Imagine a business owner closing the shop for the evening, then opening a spreadsheet. There are payments to check, orders to reconcile, and the same details to enter in different places. At home, someone is waiting for dinner.
              </p>
              <p>
                We all know some version of that feeling. A simple task that takes hours. A process that makes us start again. Work that follows us home.
              </p>
              <p>
                We find a workaround and carry on. Over time, “There must be a better way” becomes “That’s just how it works.”
              </p>
              <p>
                KAARYAN LABS began with the belief that these everyday difficulties deserve our attention. Their cost is real: time, energy, opportunities, and moments with the people who matter.
              </p>
              <p>
                A problem doesn’t become less important because people have learned to live with it.
              </p>
            </section>
            <section id="why-now" className="story-section">
              <p className="story-kicker">02 / THE DECISION</p>
              <h2>The best time to begin is now.</h2>
              <p>
                It is easy to imagine a better time to start a company: when the idea is clearer, the resources are greater, or every uncertainty has an answer.
              </p>
              <p>
                But while we wait for everything to feel ready, someone else spends another day working around the same problem.
              </p>
              <p>
                We chose to begin now, with the willingness to listen, the discipline to learn, and the commitment to take a useful first step. Conversations deepen our understanding. Testing strengthens our ideas. Each step gives us something to build on.
              </p>
              <p>
                For us, a problem worth solving is one that affects many people, carries a meaningful cost, and remains overlooked or poorly served. Those problems are already here. They deserve our effort today.
              </p>
            </section>
            <section id="understanding-first" className="story-section">
              <p className="story-kicker">03 / OUR APPROACH</p>
              <h2>Understanding comes before building.</h2>
              <p>
                Our work starts with people: what they are trying to achieve, where they get stuck, and how they manage today.
              </p>
              <p>
                That is why research sits at the heart of KAARYAN LABS. We ask questions, examine assumptions, and test ideas with the people who will use them. Understanding the underlying need helps us decide what is worth building.
              </p>
              <p>
                Sometimes, that means a software product for many people facing the same challenge. Sometimes, it means a custom solution shaped around one business and its team.
              </p>
              <p>
                In both cases, our commitment is to create software that is clear to use, reliable in practice, and able to grow, then keep improving it through feedback.
              </p>
              <Link className="story-inline-link" href="/our-process">
                Explore our process <ArrowRight size={16} />
              </Link>
            </section>
            <section id="our-purpose" className="story-section">
              <p className="story-kicker">04 / OUR PURPOSE</p>
              <h2>Progress people can feel in an ordinary day.</h2>
              <p>
                KAARYAN LABS is at the beginning of its journey. Our ambition is to build a company whose work earns its place in people’s lives.
              </p>
              <p>
                That could mean a business owner getting home in time for dinner, a team spending more time on meaningful work, or an essential service becoming easier to access.
              </p>
              <p>
                These are the everyday improvements we want to make possible.
              </p>
              <p>
                Our story begins with a simple commitment: pay attention to what people struggle with, understand it deeply, and start making it better.
              </p>
              <div className="story-signoff">
                <strong>KAARYAN LABS</strong>
                <span>FROM PROBLEM TO POSSIBILITY</span>
              </div>
            </section>
          </div>
        </article>

        <section className="story-cta">
          <div className="container">
            <p className="eyebrow">LET’S BEGIN WITH WHAT MATTERS</p>
            <h2>Have a problem worth solving?</h2>
            <p>
              Tell us what could work better. Together, we can understand the challenge and take the first step toward a practical solution.
            </p>
            <Link className="button" href="/contact-us">
              Discuss your project <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Reveal />
    </>
  );
}
