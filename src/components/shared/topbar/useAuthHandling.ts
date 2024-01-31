import { useAuth0 } from "@auth0/auth0-react";

export function useAuthHandling() {
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

  return { handleLogin ,handleLogout, handleSignUp, isAuthenticated };
}