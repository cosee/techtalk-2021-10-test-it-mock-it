// If you are using "onunhandledrejection" to show error toasts,
// you may want to use a function like this to throw errors,
// and mock it when you are testing.
export function throwError(error: Error): void {
    throw error
}
