"use client";

import { useAuthStore } from "@/stores/Auth";
import React, { useState } from "react";
import Input from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import Avatars from "@/components/Avatars";
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
    <div className="mx-auto w-full max-w-md  ">
      <Avatars />
      <h1 className="my-4 text-4xl text-center font-serif tracking-tighter">
        Sign up & <br /> create your profile.
      </h1>
      <p className="min-w-86 max-w-sm text-sm text-center text-neutral-600 dark:text-neutral-300">
        If you already have an account,
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
      </p>

      <form
        className="mt-4 font-sans p-4 shadow-2xl rounded-xl gap-4 bg-card border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 ">
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
          className="group/btn mt-2 relative block h-10 w-full font-medium  text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/80"
          type="submit"
          disabled={isLoading}
        >
          Sign up &rarr;
        </button>{" "}
      </form>
      {error && (
        <p className=" absolute -bottom-12 text-center text-sm text-destructive dark:text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default RegisterPage;
