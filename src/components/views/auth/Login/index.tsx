import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/input/index";
import Button from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
  };

  return (
    <AuthLayout
      title="login"
      link="/auth/register"
      linkText={`Don't have an account? Sign up`}
    >
      {error && <p className={styles.login__error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button
          type="button"
          className={styles.login__other__button}
          variant="secondary"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <i className="bx bxl-google"></i> Login With Google
        </Button>
      </div>
    </AuthLayout>
    // <div className={styles.login}>
    //   <h1 className={styles.login__title}>Login</h1>
    //   {error && <p className={styles.login__error}>{error}</p>}
    //   <div className={styles.login__form}>

    //   </div>
    //   <p className={styles.login__link}>
    //     Don{"'"}t have an account? Sign up{" "}
    //     <Link href="/auth/register">here</Link>
    //   </p>
    // </div>
  );
};

export default LoginView;
