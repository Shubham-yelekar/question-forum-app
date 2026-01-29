import React from "react";
import AppNavbar from "@/components/navigation/AppNavbar";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppNavbar /> {children}
    </>
  );
};

export default AppLayout;
