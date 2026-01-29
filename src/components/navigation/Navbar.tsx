"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/Auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="absolute z-10 inset-x-0 top-4 mx-auto max-w-[700px] h-fit flex align-center justify-between">
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
      {user && (
        <div className="flex justify-center gap-4">
          <Link href={"/home"}>
            <button className="flex items-center font-semibold transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl py-2  px-6 text-gray-900  hover:bg-gray-200">
              Home
            </button>
          </Link>
          <Link href={"/profile"}>
            <button className="flex items-center justify- font-semibold border transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 px-2  text-foreground border-emerald-400   hover:bg-emerald-100">
              <Avatar size="sm">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Profile
            </button>
          </Link>
        </div>
      )}
      {!user && (
        <div className="flex justify-center gap-4">
          <Link href={"/login"}>
            <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl py-2  px-6 text-gray-900 bg-gray-100 border-gray-300  hover:bg-gray-200">
              Log In
            </button>
          </Link>
          <Link href={"/register"}>
            <button className="flex items-center font-semibold border transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-2 px-6 bg-emerald-500 text-white border-emerald-600   hover:bg-emerald-600">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
