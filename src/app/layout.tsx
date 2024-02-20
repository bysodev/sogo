'use client'

import NavBar from "@/components/ui/header";
import "@/css/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import { useEffect, useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})


export default function RootLayout({ children, session }: any) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
        offset: 100,
        mirror: false,
      });
    }
  }, []);

  const [theme, setTheme] = useState('');

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') || "";
    setTheme(localTheme);
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${theme} font-inter antialiased tracking-tight relative`}>
        <SessionProvider session={session}>
          <div className="h-full flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            <NavBar toggleDarkMode={switchTheme} theme={theme} />
            <main className="h-full">
              {children}
            </main>
          </div>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}