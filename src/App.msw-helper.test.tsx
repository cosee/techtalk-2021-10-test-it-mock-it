import React from "react";
import nock from "nock";
import App from "src/App";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {rest} from "msw";
import {TodoListResponse} from "src/model/todos";
import {setupMockApi} from "src/test-utils/setup-mock-api";

const { expectRequestToHaveBeenSent, overrideHandlers } = setupMockApi(
  rest.get("/api/todos/", (req, res, ctx) => {
    return res(
      ctx.json<TodoListResponse>({
        todos: [
          { id: 1, name: "Wake up", description: "Out of the bed" },
          { id: 2, name: "Have breakfast", description: "Cereals, yumm" },
        ],
      })
    );
  }),
  rest.post("/api/todos", (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

test("renders the name of the todos loaded from the backend", async () => {
  render(<App />);
  expect(await screen.findByText("Wake up")).toBeInTheDocument();
  expect(await screen.findByText("Have breakfast")).toBeInTheDocument();
});

test("entering data and clicking the plus button adds another todo", async () => {
  render(<App />);

  const nameField = await screen.findByPlaceholderText("Name");
  userEvent.type(nameField, "Go to sleep");

  const descriptionField = await screen.findByPlaceholderText("Description");
  userEvent.type(descriptionField, "Have a good night!");

  const button = await screen.findByText("+", { selector: "button" });
  userEvent.click(button);

  await waitFor(() => {
    expectRequestToHaveBeenSent({
      method: "POST", pathname: "/api/todos",
      body: {
        name: "Go to sleep",
        description: "Have a good night!",
      },
    });
  });
});

test("when the backend returns an error message, we display that message", async () => {
  overrideHandlers(rest.get("/api/todos", (req, res, context) => {
    return res(context.status(500), context.json({message: "Internal Server Error"}))
  }))

  render(<App />);
  expect(await screen.findByText("An error occurred while loading todos")).toBeInTheDocument();
  expect(await screen.findByText("Internal Server Error")).toBeInTheDocument();
});

afterEach(() => {
  nock.cleanAll();
});
