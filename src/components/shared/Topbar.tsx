import { Link } from "react-router-dom";
import {Button} from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const Topbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  const buttons = isAuthenticated ? (
    <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
  ) : (
    <div className="flex gap-4">
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="felx gap-3 items-center">
          <img className="w-12" src={"/assets/logo.png"} alt="logo" />
        </Link>
        {buttons}
      </div>
    </section>
  );
};

export default Topbar;
