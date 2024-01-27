'use client'

import AuthProvider from "@/components/nextAuthProvider";
import NavBar from "@/components/ui/header";
import "@/css/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import { useEffect, useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

type LayoutProps = {
  children?: React.ReactNode
}

type LayoutPropsExtended = {
  children?: React.ReactNode
  session?: any
}

export default function RootLayout(props: LayoutProps | LayoutPropsExtended) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
      mirror: false,
    });
  }, []);

  const { children, session } = {
    ...props,
    session: undefined
  }

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
        <AuthProvider session={session}>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            <NavBar toggleDarkMode={switchTheme} theme={theme} />
            <main className="grid grow">
              {children}
            </main>
          </div>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}