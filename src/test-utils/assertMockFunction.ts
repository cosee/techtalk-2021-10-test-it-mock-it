

export function assertMockFunction(param: unknown): asserts param is jest.Mock {
    if (!jest.isMockFunction(param)) {
        throw new Error(`"${param}" is not a mock-function`)
    }
}
