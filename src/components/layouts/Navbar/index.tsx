import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { data: session }: { data: any } = useSession();
  return (
    <div className={styles.navbar}>
      <button
        className={styles.navbar__button}
        onClick={() => (session ? signOut() : signIn())}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Navbar;
