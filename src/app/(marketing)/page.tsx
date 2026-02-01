"use client";

import { useAuthStore } from "@/stores/Auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuthStore();

  return (
    <div className="max-w-[700px] m-auto flex flex-col items-center gap-12  mt-64">
      {/* Dashed Center Fade Grid */}
      <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage: `
        linear-gradient(to right, var(--border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border) 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* Your Content/Components */}

      <div className="flex flex-col gap-4">
        <h1 className="text-5xl tracking-tight text-center font-serif font-normal ">
          The Professional Network <br /> for builders to show & tell!
        </h1>
        <p className="font-sans text-center text-secondary ">
          Showcase your work, launch projects, find jobs, and connect <br />{" "}
          with the most (in)credible people.
        </p>
      </div>
      {user && (
        <div className="flex justify-center gap-4">
          <Link href={"/home"}>
            <button className="flex items-center font-semibold transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl bg-background shadow-2xl py-2 px-6 hover:shadow-lg">
              Home
            </button>
          </Link>
          <Link href={"/profile"}>
            <button className="flex items-center justify- font-semibold border transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 px-2  text-foreground ">
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
            <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl bg-background shadow-2xl py-2 px-6 hover:shadow-lg  ">
              Log In
            </button>
          </Link>
          <Link href={"/register"}>
            <button className="flex items-center font-semibold transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-2 px-6  bg-primary text-primary-foreground shadow-2xl  hover:shadow-lg">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
