import React from "react";
import App from "src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { TodoListResponse } from "src/model/todos";
import { setupMockApi } from "src/test-utils/setup-mock-api";
import { printHtml } from "src/utils/print";
import { mockClipboard } from "src/test-utils/mock-clipboard";

jest.mock("src/utils/print");

mockClipboard();

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

afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});

test("renders the name of the todos loaded from the backend", async () => {
  render(<App />);
  expect(await screen.findByText("Wake up")).toBeInTheDocument();
  expect(await screen.findByText("Have breakfast")).toBeInTheDocument();
});

test("prints the todo list when print button is clicked", async () => {
  render(<App />);
  const button = await screen.findByText("Print", { selector: "button" });
  userEvent.click(button);
  expect(printHtml).toHaveBeenCalledWith(expect.stringContaining("Wake up"));
});

test("copies the todos to the clipboard, when copy-to-clipboard is clicked", async () => {
  render(<App />);
  const button = await screen.findByText("Copy to clipboard", {
    selector: "button",
  });
  userEvent.click(button);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "Wake up\tOut of the bed\nHave breakfast\tCereals, yumm\n"
  );
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
      method: "POST",
      pathname: "/api/todos",
      body: {
        name: "Go to sleep",
        description: "Have a good night!",
      },
    });
  });
});

test("when the backend returns an error message, we display that message", async () => {
  overrideHandlers(
    rest.get("/api/todos", (req, res, context) => {
      return res(
        context.status(500),
        context.json({ message: "Internal Server Error" })
      );
    })
  );

  render(<App />);

  await screen.findByText("An error occurred while loading todos");
  await screen.findByText("Request failed with status code 500", {
    exact: false,
  });
});
