import { openExampleCom } from "src/test-examples/window-open";

let windowOpenSpy: jest.SpyInstance;

beforeEach(() => {
  windowOpenSpy = jest.spyOn(window, "open").mockImplementation(() => null);
});

afterEach(() => {
  windowOpenSpy.mockRestore();
});

test("window open is called", () => {
  openExampleCom();
  expect(window.open).toHaveBeenCalledWith("https://www.example.com");
});

