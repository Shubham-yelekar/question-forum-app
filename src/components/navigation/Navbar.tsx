"use client";
import Link from "next/link";
import { useAuthStore } from "@/stores/Auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../Icons/Logo";
const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="absolute z-10 inset-x-0 top-4 mx-auto max-w-[700px] h-fit flex align-center justify-between">
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      {user && (
        <div className="flex justify-center gap-4">
          <Link href={"/home"}>
            <button className="flex items-center font-semibold transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl bg-background shadow-2xl py-2 px-6 hover:shadow-lg">
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
            <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl bg-background shadow-2xl py-2 px-6 hover:shadow-lg ">
              Log In
            </button>
          </Link>
          <Link href={"/register"}>
            <button className="flex items-center font-semibold border transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-2 px-6 bg-primary text-primary-foreground shadow-2xl  hover:shadow-lg">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
