import About from '@/components/about';
import Contact from '@/components/contact';
import FaqSection from '@/components/faqSection';
import Hero from '@/components/hero';
import MouseTracker from '@/components/ui/mouseTracker';
import Zigzag from '@/components/zigzag';

export const metadata = {
  title: "Sogo Sign",
  description: "Plataforma de aprendizaje de Lengua de Señas Ecuatoriana",
  generator: "Next.js",
  applicationName: "Sogo Sign",
  referrer: "origin-when-cross-origin",
  keywords: [
    "plataforma",
    "aprendizaje",
    "lengua de señas",
    "lengua de ecuatoriana",
    "LSE",
  ],
  authors: [
    { name: "Anthony", url: "https://github.com/Anthonymgd" },
    { name: "Bryan", url: "https://github.com/bysodev" },
  ],
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/src/favicon.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/src/favicon-dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <MouseTracker offset={{ x: -15, y: -15 }} />
      <Hero />
      <Zigzag />
      <About />
      <Contact />
      <FaqSection />
    </>
  );
}