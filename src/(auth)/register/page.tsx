import { useAuthStore } from "@/stores/Auth";
import React, { useState } from "react";

const RegisterPage = () => {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handelSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;

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
      password?.toString()
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
  return <div>{error && <p>{error}</p>}</div>;
};

export default RegisterPage;
