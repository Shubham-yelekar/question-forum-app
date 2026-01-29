import React from "react";
import AppNavbar from "@/components/navigation/AppNavbar";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <AppNavbar />

      {/* Body */}
      <div className="mx-auto max-w-[900px]">
        <div className="grid grid-cols-12 gap-6 py-6">
          {/* Left Sidebar */}
          <aside className="col-span-3 hidden lg:block sticky top-20 h-fit">
            <div className="rounded-xl border bg-white p-4">Side nav</div>
          </aside>

          {/* Main Feed */}
          <main className="col-span-12 lg:col-span-6 space-y-6">
            {children}
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-3 hidden lg:block sticky top-20 h-fit">
            <div className="rounded-xl border bg-white p-4">Right side nav</div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
