import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/counter" className="[&.active]:font-bold">
          Counter
        </Link>
      </div>
      <div className="p-10 bg-amber-200 h-screen">
        <div className="p-10 bg-white rounded-2xl">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
