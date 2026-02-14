"use client";

import Navbar from "@/components/navigation/Navbar";
import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (hydrated && session) {
      router.push("/home");
    }
  }, [hydrated, session, router]);

  if (!hydrated) {
    return null;
  }

  if (session) {
    return null;
  }

  return (<>
        <Navbar />
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 ">
      <div className="relative">
        {children}</div>
    </div>
  </>
  );
};

export default Layout;
