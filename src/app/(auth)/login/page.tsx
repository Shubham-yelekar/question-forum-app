"use client";

import React from "react";
import { useAuthStore } from "@/stores/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Image from "next/image";
export default function Login() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError(() => "Please fill out all fields");
      return;
    }

    setIsLoading(() => true);
    setError(() => "");

    const loginResponse = await login(email.toString(), password.toString());
    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }

    setIsLoading(() => false);
    router.push("/home");
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl  shadow-input">
      <h1 className=" text-4xl my-5 font-serif text-center  tracking-tighter">
        Welcome back! <br /> Login to your account.
      </h1>
      <p className="min-w-86 mt-2 max-w-sm text-sm text-neutral-600 text-center dark:text-neutral-300">
        If dont have an account,
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>{" "}
      </p>
      {error && (
        <p className="absolute text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
      <form
        className="mt-4 flex flex-col p-4 shadow-2xl gap-4 font-sans"
        onSubmit={handleSubmit}
      >
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <Input
          required
          className="text-black"
          id="email"
          name="email"
          placeholder="projectmayhem@fc.com"
          type="email"
        />

        <label className="text-sm">Password</label>
        <Input
          required
          className="text-black"
          id="password"
          name="password"
          placeholder="••••••••"
          type="password"
        />

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          Log in &rarr;
        </button>
      </form>
    </div>
  );
}
