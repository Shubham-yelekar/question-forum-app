"use client";

import { useAuthStore } from "@/stores/Auth";
import { useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session, hydrated } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (hydrated && session) {
      router.push("/");
    }
  }, [hydrated, session, router]);

  if (!hydrated) {
    return null;
  }

  if (session) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 bg-emerald-300  bg-[url('/icon.png')]">
      <div className="relative">{children}</div>
    </div>
  );
};

export default Layout;
