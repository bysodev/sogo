"use client";
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
  }, []);

  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const SideNavbar = render ? require("@/components/SideNavbar").default : null;
  const BottomNavbar = render ? require("@/components/BottomNavbar").default : null;
  const RankUser = render ? require("@/components/RankUser").default : null;

  return (
    <>
      {render && (
        <>
          {SideNavbar && <SideNavbar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />}
          {BottomNavbar && <BottomNavbar />}
        </>
      )}
      <div className={`transition-all duration-300 lg:ms-${render && (isNavbarOpen ? '72' : '24') + " grid lg:grid-cols-2"}`}>
        <section className='h-full flex flex-col gap-10'>{children}</section>
        {render && (
          <>
            {RankUser && <RankUser />}
          </>
        )}
      </div>
    </>
  );
}


