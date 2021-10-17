
type AnyFunction = (...args: any) => any;

export function castToMock<T extends AnyFunction>(fn: T): jest.Mock {
    return fn as unknown as jest.Mock;
}
