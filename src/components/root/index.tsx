import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import routesConfig from '@/routesConfig';

const Home = () => {
  return (
    <>
      <div className="p-2 flex gap-2">
        {routesConfig.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="[&.active]:font-bold"
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-10 bg-amber-200 h-screen overflow-auto">
        <div className="p-10 bg-white rounded-2xl">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

export default Home;
