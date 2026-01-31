import React from "react";
import AppNavbar from "@/components/navigation/AppNavbar";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background ">
      {/* Top Navbar */}
      <AppNavbar />
      <div className="mx-auto border-x-1  max-w-[1000px]">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
