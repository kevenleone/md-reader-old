export function fetcher<T = any>(
  url: string,
  params?: RequestInit
): Promise<T> {
  return fetch(url, {
    ...params,
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("err");
    })
    .catch((error) => {});
}
