export function mockClipboard() {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    // clipboard does not exist in jsdom, but is readonly in typings, so we have to
    // use Object.assign to set it
    // jest.spyOn does not work here, because only wraps functions and "clipboard" is an object.
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  afterEach(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });
}
