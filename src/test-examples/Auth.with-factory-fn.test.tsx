import { render, screen } from "@testing-library/react";
import { Auth } from "src/test-examples/Auth";

jest.mock("keycloak-js", () => {
  return {
    __esModule: true,
    default: () => {
      return ({
         init: jest.fn(() => Promise.resolve(true))
      });
    },
  };
});

test("should call keycloak", async () => {
  render(<Auth />);

  expect(await screen.findByText("Authenticated")).toBeInTheDocument();
});
