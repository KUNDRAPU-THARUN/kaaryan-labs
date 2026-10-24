import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://127.0.0.1:3000'),
  title: 'Kaaryan Labs — From Problem to Possibility',
  description: 'A research-driven software company building purposeful digital products and custom software solutions.',
  openGraph: { title: 'Kaaryan Labs — From Problem to Possibility', description: 'We research. We engineer. We build software.', type: 'website', images: ['/brand/kaaryan-logo-primary.jpeg'] },
  icons: { icon: '/brand/kaaryan-logo-primary.jpeg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={GeistSans.className}>{children}</body></html>;
}
