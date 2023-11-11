"use client";

import SideNavbar from "@/components/side-nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SideNavbar />
      {children}
    </div>
  );
}
