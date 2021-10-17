import {render, screen} from "@testing-library/react";
import {Auth} from "src/test-examples/Auth";
import videojs from "video.js";

jest.mock('video.js')

test("should call videojs", () => {
    render(<Auth />)
    const videoElement = screen.getByTestId("videojs-video")
    expect(videojs).toHaveBeenCalledWith(videoElement, {muted: true}, expect.any(Function))
})
