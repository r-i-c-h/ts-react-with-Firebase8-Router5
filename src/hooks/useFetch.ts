import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('the fetch was aborted');
          }
          setError('Could not fetch the data');
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

/** Alternatively:
//? Alternate Code #0.5: See https://javascript.plainenglish.io/how-to-create-a-reusable-custom-hook-with-react-js-and-typescript-6e5ef8340e1
//? Alternate Code #1: See https://codesandbox.io/s/dreamy-cloud-oocxq?eslint=1&fontsize=14&hidenavigation=1&theme=dark&file=/src/hooks.ts
//? Alternate Code #2: See  https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
**/
