import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Kesurved | Authentic Herbal Hair Oils',
  description: 'Pure, natural, and authentic herbal hair oils for strong and beautiful hair. Restore your hair health with Kesurved.',
  openGraph: {
    title: 'Kesurved | Authentic Herbal Hair Oils',
    description: 'Pure, natural, and authentic herbal hair oils for strong and beautiful hair.',
    url: 'https://kesurved.com', // Update with actual domain
    siteName: 'Kesurved',
    images: [
      {
        url: '/images/hero-bg.jpg', // Fallback OG image
        width: 1200,
        height: 630,
        alt: 'Kesurved Herbal Hair Oils',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kesurved | Authentic Herbal Hair Oils',
    description: 'Pure, natural, and authentic herbal hair oils for strong and beautiful hair.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-brand-light text-brand-dark" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
