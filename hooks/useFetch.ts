import * as React from "react";

export function useFetch<T>(uri: string) {
  const [result, setResult] = React.useState<T | undefined>();
  const [error, setError] = React.useState<unknown>();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const callback = React.useCallback(
    (options?: RequestInit) => {
      setIsFetching(() => true);
      fetch(uri, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to retrieve resource");
          }
        })
        .then((res) => setResult(res))
        .catch((err) => setError(() => err))
        .finally(() => setIsFetching(() => false));
    },
    [uri]
  );

  return { result, error, isFetching, callback };
}
