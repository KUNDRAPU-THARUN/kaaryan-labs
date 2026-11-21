import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { ScrollRestoration } from '@/components/scroll-restoration';
import './globals.css';

const siteTitle = 'Kaaryan Labs | Software Products & Custom Solutions';
const siteDescription = 'Research-driven digital products and custom software solutions, built to turn complex problems into practical, real-world impact.';
const socialImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Kaaryan Labs — From Problem to Possibility',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kaaryanlabs.in'),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://kaaryanlabs.in/',
    siteName: 'Kaaryan Labs',
    locale: 'en_IN',
    type: 'website',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/brand/kaaryan-mark.png', type: 'image/png', sizes: '640x640' }],
    apple: [{ url: '/brand/kaaryan-mark.png', type: 'image/png', sizes: '640x640' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
