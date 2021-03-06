import React from "react";
import nock from "nock";
import App from "src/App";
import {render, screen} from "@testing-library/react";

beforeEach(() => {
  nock.disableNetConnect();
  nock("http://localhost")
      .persist()
    .get("/api/todos")
    .reply(200, {
      todos: [
        { id: 1, name: "Wake up", description: "Out of the bed" },
        { id: 2, name: "Have breakfast", description: "Cereals, yum" },
      ],
    });
});

afterEach(() => {
  nock.enableNetConnect();
  nock.restore();
  nock.cleanAll()
});


test("renders the name of the todos loaded from the backend", async () => {
  render(<App />);
  expect(await screen.findByText("Wake up")).toBeInTheDocument();
  expect(await screen.findByText("Have breakfast")).toBeInTheDocument();
});

