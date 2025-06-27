import { Suspense, use, useEffect } from 'react';

export default function SuspensePage() {
  useEffect(() => {
    return () => {
      // Reset cache when component unmounts to prevent stale data.
      // This ensures a fresh API request is made when navigating back to this page.
      cache = new Map();
    };
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <A />
    </Suspense>
  );
}

function A() {
  const users = use(fetchUsers('https://fakestoreapi.com/users'));

  return (
    users && (
      <p>
        {users.map((u, i) => (
          <li key={i}>{u.email}</li>
        ))}
      </p>
    )
  );
}

function Fallback() {
  return 'Loading...';
}

interface User {
  email: string;
}

let cache = new Map();
function fetchUsers(url: string): Promise<User[]> {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const p = new Promise<User[]>((resolve, reject) => {
    fetch(url).then(
      (r) => {
        if (!r.ok) {
          reject('failed');
        }

        r.json().then((data) => {
          resolve(data);
        });
      },
      () => {
        reject();
      },
    );
  });

  cache.set(url, p);

  return p;
}
