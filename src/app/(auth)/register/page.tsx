"use client";

import { useAuthStore } from "@/stores/Auth";
import React, { useState } from "react";
import { Input } from "../../../components/ui/Input";
import Link from "next/link";
import Image from "next/image";
const RegisterPage = () => {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!firstName || !lastName || !email || !password) {
      setError(() => "Please fill out all the field");
      return;
    }
    setIsLoading(true);
    setError("");

    const response = await createAccount(
      `${firstName} ${lastName}`,
      email?.toString(),
      password?.toString(),
    );
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginRespones = await login(email.toString(), password.toString());
      if (loginRespones.error) {
        setError(() => loginRespones.error!.message);
      }
    }

    setIsLoading(() => false);
  };
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl ">
      <Image src={"/logo.png"} alt={"askly-logo"} width={120} height={120} />

      <h1 className="mt-4 text-2xl font-semibold font-sans tracking-tighter">
        Create your account
      </h1>
      <p className="min-w-86 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        If you already have an account,
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
      </p>

      {error && (
        <p className=" absolute text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 ">
          <label className="text-sm" htmlFor="firstname">
            First name
          </label>
          <Input
            required
            className="text-black"
            id="firstname"
            name="firstname"
            placeholder="Tyler"
            type="text"
          />

          <label className=" text-sm" htmlFor="lastname">
            Last name
          </label>
          <Input
            required
            className="text-black"
            id="lastname"
            name="lastname"
            placeholder="Durden"
            type="text"
          />

          <label className=" text-sm" htmlFor="email">
            Email Address
          </label>
          <Input
            required
            className="text-black"
            id="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />

          <label className=" text-sm" htmlFor="password">
            Password
          </label>
          <Input
            required
            className="text-black"
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </div>
        <button
          className="group/btn mt-2 relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          Sign up &rarr;
        </button>{" "}
      </form>
    </div>
  );
};

export default RegisterPage;
