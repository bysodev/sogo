"use client";

import { usePathname } from "next/navigation";


export default function ChallengeLayout({
  children,
  challenges, 
  ranking
}: {
  children: React.ReactNode;
  challenges: React.ReactNode;
  ranking: React.ReactNode;
}) {

  const currentPath = usePathname();
  const permitRender = ["/challenge"];

  return (
    <>
    {
      permitRender.includes(currentPath) && challenges
      // <div className="w-full p-16 flex flex-wrap justify-around">
      // </div>        
    }
    {children}
    </>
  );
}
 