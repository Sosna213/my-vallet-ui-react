import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

export const AuthenticationGuard = (props: { component: ComponentType }) => {
  const Component = withAuthenticationRequired(props.component);

  return <Component />;
};
