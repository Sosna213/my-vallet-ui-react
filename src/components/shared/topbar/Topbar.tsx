import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "..";
import { useAuthHandling } from "./useAuthHandling";

const Topbar = (): React.ReactElement => {
  const { handleLogin, handleLogout, handleSignUp, isAuthenticated } = useAuthHandling();

  const buttons = isAuthenticated ? (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <div className="flex gap-4">
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <div className="flex-between gap-3">
          <Link to="/" className="felx gap-3 items-center">
            <img
              className="w-14 dark:invert ml-5"
              src={"/assets/logo.svg"}
              alt="logo"
            />
          </Link>
          <Link to="/" className="felx gap-3 items-center">
            <span className=" font-bold text-2xl">My wallet</span>
          </Link>
        </div>
        <div className="flex flex-nowrap gap-4">
          <ModeToggle />
          {buttons}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
