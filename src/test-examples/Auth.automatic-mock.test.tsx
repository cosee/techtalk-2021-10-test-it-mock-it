import { render, screen } from "@testing-library/react";
import { Auth } from "src/test-examples/Auth";
import Keycloak from "keycloak-js";
import { assertMockFunction } from "src/test-utils/assertMockFunction";

jest.mock("keycloak-js");

xdescribe("In order for this test to run, the src/__mocks__/keycloak-js.ts file must be renamed or removed", () => {
  it("should call keycloak", async () => {
    assertMockFunction(Keycloak);

    const keycloakInitMock = jest.fn().mockResolvedValue(true);

    Keycloak.mockReturnValue({
      init: keycloakInitMock,
    });

    render(<Auth />);

    expect(await screen.findByText("Authenticated")).toBeInTheDocument();
    expect(keycloakInitMock).toHaveBeenCalledWith({ onLoad: "login-required" });
  });
});
