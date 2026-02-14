"use client";

import React from "react";
import { useAuthStore } from "@/stores/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";

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
      setIsLoading(() => false);
      return;
    }

    setIsLoading(() => false);
    router.push("/home");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className=" text-4xl font-serif text-center  tracking-tighter">
        Welcome back! <br /> Login to your account.
      </h1>
      <p className="min-w-86 my-4  max-w-sm text-sm text-neutral-600 text-center dark:text-neutral-300">
        If dont have an account,
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>{" "}
      </p>

      <form
        className="mt-4 flex flex-col p-4 shadow-2xl rounded-xl gap-4 bg-card font-sans border"
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
          className="group/btn relative block h-10 w-full transition-all ease-in duration-75 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/80"
          type="submit"
          disabled={isLoading}
        >
          Log in &rarr;
        </button>
      </form>
      {error && (
        <p className="absolute -bottom-16 text-center text-sm text-destructive dark:text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
