import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    const result = await authServices.registerAccount(data);
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already used");
    }
  };

  return (
    <AuthLayout
      title="Register"
      error={error}
      link="/auth/login"
      linkText="Have an account? Sign in"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Fullname"
        />
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Input label="Phone" name="phone" type="number" placeholder="Phone" />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button
          disabled={isLoading}
          type="submit"
          className={styles.register__button}
        >
          {isLoading ? "Loading..." : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
