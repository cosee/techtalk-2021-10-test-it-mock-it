export function mockWindowOpen(): void {
  let windowOpenSpy: jest.SpyInstance;

  beforeEach(() => {
    windowOpenSpy = jest.spyOn(window, "open")
        .mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });
}
