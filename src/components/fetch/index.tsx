// 🧠 5. Traer datos de un API (fake)
// Objetivo: Uso de useEffect y manejo de loading/error.
// Haz fetch a https://jsonplaceholder.typicode.com/users y muestra la lista de nombres.

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

type States = 'idle' | 'pending' | 'success' | 'error';

const Fetch = () => {
  const {
    data: users,
    state,
    error,
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  return (
    <>
      {state === 'error' && <p className="text-red-600">Error: {error}</p>}
      {state === 'pending' && 'Loading users...'}
      {state === 'success' && users?.length === 0 && <p>No users found</p>}
      {state === 'success' && users?.length ? (
        <ol>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ol>
      ) : null}
    </>
  );
};

function useFetch<T>(url: string): {
  data: T | null;
  state: States;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<States>('idle');
  const [error, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData(): Promise<void> {
      try {
        setState('pending');
        setErrorMessage(null);
        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(
            `Error fetching data: ${res.status} ${res.statusText}`,
          );
        }

        const responseData: T = await res.json();
        setData(responseData);
        setState('success');
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.name === 'AbortError') {
            console.log(
              'Fetch was aborted. Notice that in dev mode React might trigger this due to Strict mode.',
            );
            return;
          }
          setState('error');
          setErrorMessage(e.message);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, state, error };
}

export default Fetch;
