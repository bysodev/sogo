"use client";
import BottomNavbar from "@/components/BottomNavbar";
import SideNavbar from "@/components/SideNavbar";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname()
  const validRoutes = ["/lesson", "/learn", "/challenge"]
  const render: boolean = validRoutes.includes(pathname);

  useEffect(() => {
    !render && setIsNavbarOpen(false)
  }, [render]);

  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      {render && (
        <>
          <SideNavbar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
          <BottomNavbar />
        </>
      )}
      <main className={`transition-all duration-300 lg:ms-${render && (isNavbarOpen ? '52' : '16')}`}>{children}</main>
    </>
  );
}
