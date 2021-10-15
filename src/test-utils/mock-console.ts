type ConsoleMethod = 'debug' | 'log' | 'error'

export function mockConsole(method: ConsoleMethod): void {
    const originalMethod = console[method];

    beforeEach(() => {
        console[method] = jest.fn();
    });

    afterEach(() => {
        console[method] = originalMethod;
    });
}
