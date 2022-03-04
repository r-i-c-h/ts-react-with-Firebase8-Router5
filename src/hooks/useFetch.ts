import { useState, useEffect } from 'react';
import { IFetchResponse } from '../ts/interfaces';

const useFetch = <T>(url: string, method = 'GET'): IFetchResponse<T> => {
  // const useFetch = <T>( url: string ): { data: T | null; isPending: Boolean; error: null | string | Error } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);
  const [options, setOptions] = useState<RequestInit | null>(null);

  const postData = (postData: unknown) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(postData)
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions: RequestInit) => {
      setIsPending(true);

      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Data fetch was aborted');
          } else {
            setError(`PROBLEM! ${err.name}: ${err.message}`);
          }
        }
      }
    };
    if (method === 'GET') {
      fetchData({});
    }

    if (method === 'POST' && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};

export default useFetch;

/** Alternatively:
//? Alternate Code #0.5: See https://javascript.plainenglish.io/how-to-create-a-reusable-custom-hook-with-react-js-and-typescript-6e5ef8340e1
//? Alternate Code #1: See https://codesandbox.io/s/dreamy-cloud-oocxq?eslint=1&fontsize=14&hidenavigation=1&theme=dark&file=/src/hooks.ts
//? Alternate Code #2: See  https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
**/
