import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";


// Keycloak-init-example from https://scalac.io/blog/user-authentication-keycloak-1/
export const Auth: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      setAuthenticated(authenticated);
    });
  }, []);

  if (authenticated == null) {
    return <div>Loading...</div>;
  }

  return <div>{authenticated ? "Authenticated" : "Anonymous"}</div>;
};
