import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth0 } from "@auth0/auth0-react";
import { Accounts } from ".";
import { Checkbox } from "@/components/ui/checkbox";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
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
  if (!isAuthenticated) {
    return (
      <Card className="flex w-full justify-center items-center flex-col flex-wrap">
        <img src={"/assets/signUp.png"} alt={"empty"} width={600} />
        <div className="pb-4 font-bold text-xl">
          <div>Elevate Your Finances with My Wallet!</div>
          <div>Unlock financial control in seconds:</div>
          <div>
            <Checkbox disabled checked /> Secure{" "}
          </div>
          <div>
            <Checkbox disabled checked /> Simplified Budgeting{" "}
          </div>
          <div>
            <Checkbox disabled checked /> Goal Tracking{" "}
          </div>
          <div>
            <Checkbox disabled checked /> Smart Insights
          </div>
        </div>
        <div className="pb-4 font-bold text-3xl">
          <Button onClick={handleSignUp}>Sign Up</Button>
        </div>
      </Card>
    );
  }
  return (
    <Card className="w-full flex">
      <div className="p-5 w-full lg:w-1/2 2xl:w-1/3">
        <Accounts readonly={true} />
      </div>
    </Card>
  );
};

export default Home;
