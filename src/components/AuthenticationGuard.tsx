import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface AuthenticationGuardProps {
  component: ComponentType;
}

const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component);

  return <Component />;
};

export default AuthenticationGuard;
