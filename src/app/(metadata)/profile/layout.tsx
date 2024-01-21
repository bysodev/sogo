"use client";
import BottomNavbar from "@/components/BottomNavbar";
import SideNavbar from "@/components/SideNavbar";
import { useState } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <SideNavbar isOpen={isNavbarOpen} onToggle={handleNavbarToggle} />
      <BottomNavbar />
      <main className={`transition-all duration-300 lg:ms-${isNavbarOpen ? '52' : '16'}`}>{children}</main>
    </>
  );
}
