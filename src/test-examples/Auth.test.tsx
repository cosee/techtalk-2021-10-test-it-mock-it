import { render, screen } from "@testing-library/react";
import { Auth } from "src/test-examples/Auth";
import { keycloakInitMock } from "keycloak-js";

jest.mock("keycloak-js");

test("should call keycloak", async () => {
  keycloakInitMock.mockResolvedValue(true);
  render(<Auth />);

  expect(await screen.findByText("Authenticated")).toBeInTheDocument();
  expect(keycloakInitMock).toHaveBeenCalledWith({ onLoad: "login-required" });
});
