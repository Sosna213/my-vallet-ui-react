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
    <section className="topbar mt-2">
      <div className="py-4 px-5 flex justify-end">
        <div className="flex flex-nowrap gap-4">
          <ModeToggle />
          {buttons}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
