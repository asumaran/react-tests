import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import routesConfig from '@/routesConfig';
import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');

  const filteredRoutes = routesConfig.filter((r) =>
    r.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="flex">
        <div className="h-screen w-48 bg-amber-200 text-sm p-5">
          <div className="mb-5">
            <input
              type="search"
              placeholder="Search…"
              className="w-full bg-white text-sm px-4 py-2 border-amber-400 focus:border-amber-600 focus:shadow-md focus:outline-0 border rounded-full"
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </div>
          <div className="space-y-1">
            {filteredRoutes.map((route) => (
              <div key={route.path}>
                <Link to={route.path} className="[&.active]:font-bold">
                  {route.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-10  h-screen">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

export default Home;
