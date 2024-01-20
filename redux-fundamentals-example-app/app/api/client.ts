// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

type RequestOptions = {
  body?: object;
  method?: string;
  headers?: { [key: string]: string };
};

type ClientResponse<T = unknown> = {
  status: number;
  data: T;
  headers: Headers;
  url: string;
};

export async function client<T>(
  endpoint: string,
  { body, ...customConfig }: RequestOptions = {}
): Promise<ClientResponse<T>> {
  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(
      (err instanceof Error ? err.message : data!) || "An error occurred"
    );
  }
}

client.get = function <T>(
  endpoint: string,
  customConfig: RequestOptions = {}
): Promise<ClientResponse<T>> {
  return client<T>(endpoint, { ...customConfig, method: "GET" });
};

client.post = function <T>(
  endpoint: string,
  body: object,
  customConfig: RequestOptions = {}
): Promise<ClientResponse<T>> {
  return client<T>(endpoint, { ...customConfig, body });
};
