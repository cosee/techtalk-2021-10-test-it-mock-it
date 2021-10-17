// In order for this test to run, the src/__mocks__/keycloak-js.ts file must be renamed or removed

import {render, screen} from "@testing-library/react";
import {Auth} from "src/test-examples/Auth";
import Keycloak from "keycloak-js";
import {castToMock} from "src/test-utils/castToMock";

jest.mock("keycloak-js");

test("should call keycloak", async () => {
  const keycloakInitMock = jest.fn().mockResolvedValue(true);
  castToMock(Keycloak).mockReturnValue({
    init: keycloakInitMock
  })

  render(<Auth />);

  expect(await screen.findByText("Authenticated")).toBeInTheDocument();
  expect(keycloakInitMock).toHaveBeenCalledWith({ onLoad: "login-required" });
});
