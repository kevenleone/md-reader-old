export async function fetcher<T = any>(
  url: string,
  params?: RequestInit,
  onlyResponse = false
): Promise<T | Response | string> {
  try {
    const response = await fetch(url, {
      ...params,
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
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
