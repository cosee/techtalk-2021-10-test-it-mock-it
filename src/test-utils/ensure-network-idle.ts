import axios, { AxiosRequestConfig } from "axios";
import { waitFor } from "@testing-library/react";

const pendingRequests: Set<AxiosRequestConfig> = new Set();

axios.interceptors.request.use((requestConfig) => {
  pendingRequests.add(requestConfig);
  return requestConfig;
});

axios.interceptors.response.use(
  (response) => {
    pendingRequests.delete(response.config);
    return response;
  },
  (error) => {
    pendingRequests.delete(error.response.config);
    return Promise.reject(error);
  }
);

export async function waitForNetworkToBecomeIdle(): Promise<void> {
  await waitFor(() => {
    expect(requestsInHumanReadableForm()).toHaveLength(0);
  });
}

function requestsInHumanReadableForm() {
  const pendingRequestArray = [...pendingRequests];
  return pendingRequestArray.map((requestConfig) => {
    return humanReadable(requestConfig);
  });
}

function humanReadable(requestConfig: AxiosRequestConfig) {
  const method = requestConfig.method?.toUpperCase();
  const url = requestConfig.url;
  const body = JSON.stringify(requestConfig.data);
  return { method, url, body };
}
