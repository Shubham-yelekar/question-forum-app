"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/Auth";
const AppNavbar = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div className="sticky  border-b-1 solid bg-gray-300  z-10 inset-x-0 top-4 mx-auto max-w-[700px] h-fit flex align-center justify-between">
      <div>
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt={"askly-logo"}
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl py-2  px-6 text-gray-900 bg-gray-100 border-gray-300  hover:bg-gray-200"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AppNavbar;
