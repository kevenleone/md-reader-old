export async function fetcher<T = any>(
  url: string,
  options?: RequestInit,
  onlyResponse = false
): Promise<T | Response | string> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...options?.headers,
      },
    });

    if (onlyResponse) {
      return response;
    }

    if (response.ok) {
      return response.json();
    }

    throw new Error("Error.");
  } catch (error) {
    return error;
  }
}
