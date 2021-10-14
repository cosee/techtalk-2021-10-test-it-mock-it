import {DefaultRequestBody, RequestHandler} from "msw";
import {setupServer} from "msw/node";


interface SetupMockApiResult {
    overrideHandlers(...requestHandlers: RequestHandler[]): void
    expectRequestToHaveBeenSent(request: Partial<CapturedRequest>): void
}

interface CapturedRequest {
    method: string;
    pathname: string;
    body?: DefaultRequestBody;
}

export function setupMockApi(...requestHandlers: RequestHandler[]): SetupMockApiResult {
    const server = setupServer(...requestHandlers)
    let capturedRequests: CapturedRequest[] = []

    beforeEach(async () => {
        capturedRequests = []
        server.listen({onUnhandledRequest: "error"})
        server.events.on("request:end", request => {
            capturedRequests.push({
                method: request.method,
                pathname: request.url.pathname,
                body: request.body
            })
        })
    })

    afterEach(async () => {
        server.resetHandlers()
        server.close()
    })

    return {
        overrideHandlers(...requestHandlers) {
            server.use(...requestHandlers)
        },
        expectRequestToHaveBeenSent(request: Partial<CapturedRequest>) {
            expect(capturedRequests).toContainEqual(expect.objectContaining(request))
        }
    }
}
