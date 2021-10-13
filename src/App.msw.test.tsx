import React from "react";
import nock from "nock";
import App from "src/App";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { MockedRequest, rest } from "msw";
import { TodoListResponse } from "src/model/todos";

const server = setupServer(
  rest.get("/api/todos/", (req, res, ctx) => {
    return res(
      ctx.json<TodoListResponse>({
        todos: [
          {
            id: 1,
            name: "Wake up",
            description: "Out of the bed",
          },
          {
            id: 2,
            name: "Have breakfast",
            description: "Cereals, yumm",
          },
        ],
      })
    );
  }),
  rest.post("/api/todos", (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

let requests: MockedRequest[] = [];

beforeEach(() => {
  requests = [];
  server.listen();
  server.events.on("request:start", (request) => requests.push(request));
});

afterEach(() => {
  server.close();
});

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
    expect(requests).toContainEqual(
      expect.objectContaining<Partial<MockedRequest>>({
        method: "POST",
        body: {
          name: "Go to sleep",
          description: "Have a good night!",
        },
      })
    );
  });
});

afterEach(() => {
  nock.cleanAll();
});
