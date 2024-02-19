"use client";
import useScreenSize from '@/utilities/useScreenSize';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname()
  const validRoutes = ["/lesson", "/learn", "/challenge", "/profile"]
  const render: boolean = validRoutes.includes(pathname);

  useEffect(() => {
    !render && setIsNavbarOpen(false)
  }, [render]);

  useEffect(() => {
    localStorage.setItem('theme', 'light')
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }, []);

  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const isXlScreen = useScreenSize('xl');

  useEffect(() => {
    if (isXlScreen) {
      setIsNavbarOpen(true);
    } else {
      setIsNavbarOpen(false);
    }
  }, [isXlScreen]);

  const SideNavbar = render ? require("@/components/SideNavbar").default : null;
  const BottomNavbar = render ? require("@/components/BottomNavbar").default : null;
  const RankUser = render ? require("@/components/RankingUser").default : null;

  return (
    <div className='flex'>
      {render && (
        <>
          {SideNavbar && <SideNavbar isOpen={isNavbarOpen} />}
          {BottomNavbar && <BottomNavbar />}
        </>
      )}
      <div className={`w-full transition-all duration-300 flex flex-col lg:flex-row ${render ? "max-w-screen-2xl lg:columns-2" : "lg:columns-1"} xl:mx-auto`}>
        <section className='h-full flex flex-col gap-10 lg:w-2/3'>{children}</section>
        {render && (
          <>
            {RankUser && <RankUser />}
          </>
        )}
      </div>
    </div>
  );
}


