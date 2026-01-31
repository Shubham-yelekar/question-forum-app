"use client";
import React from "react";
import Link from "next/link";
import { AvatarMenu } from "./AvatarMenu";
import Logo from "../Icons/Logo";
const AppNavbar = () => {
  return (
    <div className="sticky grid grid-cols-12 bg-background  border-x-1 border-b-1 solid   z-10 inset-x-0 top-0  mx-auto max-w-[1000px] h-fit align-center justify-between">
      <div className="col-span-3 p-3">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className=" p-2 border-x-1  lg:col-span-6"></div>
      <div className=" p-3 col-span-3 flex justify-center gap-4">
        {/* <button
          onClick={handleLogout}
          className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl py-2  px-6 text-gray-900 bg-gray-100   hover:bg-gray-200"
        >
          Log out
        </button> */}
        <AvatarMenu />
      </div>
    </div>
  );
};

export default AppNavbar;
