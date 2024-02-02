"use client"
import About from '@/components/about';
import Contact from '@/components/contact';
import FaqSection from '@/components/faqSection';
import Hero from '@/components/hero';
import MouseTracker from '@/components/ui/mouseTracker';
import Zigzag from '@/components/zigzag';
import useScreenSize from '@/utilities/useScreenSize';

export default function Home() {
  const isLargeScreen = useScreenSize('md');

  return (
    <>
      {isLargeScreen && <MouseTracker offset={{ x: -15, y: -15 }} />}
      <Hero />
      <Zigzag />
      <About />
      <Contact />
      <FaqSection />
    </>
  );
}