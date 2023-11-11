"use client";
import { Metadata } from "next";
import "./globals.css";
import ProtectedProvider from "@/components/ProtectedProvider";
import { SessionProvider } from "next-auth/react";
// export const metadata: Metadata = {
//   title: "Sogo Sign",
//   description: "Plataforma de aprendizaje de Lengua de Señas Ecuatoriana",
//   generator: "Next.js",
//   applicationName: "Sogo Sign",
//   referrer: "origin-when-cross-origin",
//   keywords: [
//     "plataforma",
//     "aprendizaje",
//     "lengua de señas",
//     "lengua de ecuatoriana",
//     "LSE",
//   ],
//   authors: [
//     { name: "Anthony", url: "https://github.com/Anthonymgd" },
//     { name: "Bryan", url: "https://github.com/bysodev" },
//   ],
//   robots: {
//     index: false,
//     follow: true,
//     nocache: true,
//     googleBot: {
//       index: true,
//       follow: false,
//       noimageindex: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
        {/* <ProtectedProvider> */}
        {/* </ProtectedProvider> */}
      </body>
    </html>
  );
}
