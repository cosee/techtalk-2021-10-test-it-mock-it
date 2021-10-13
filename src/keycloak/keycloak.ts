import Keycloak from "keycloak-js";

const keycloak = Keycloak("/keycloak.json");

export async function initKeycloak(): Promise<void> {
  await  keycloak.init({ onLoad: "login-required" })
}

export function isAuthenticated(): boolean | null {
    // TODO: implement this.
    return false
}

export function useKeycloak(): UseKeycloakResult {
  // TODO: implement this
  return { isAuthenticated: false, isInitialized: false };
}

interface UseKeycloakResult {
    isAuthenticated: boolean;
    isInitialized: boolean;
}
