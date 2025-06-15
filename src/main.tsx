import './index.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import routesConfig from './routesConfig';
import Root from './components/root';

const rootRoute = createRootRoute({
  component: Root,
});

// Create dynamic routes from config
const dynamicRoutes = routesConfig.map((r) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: r.path,
    component: r.component,
  });
});

const routeTree = rootRoute.addChildren(dynamicRoutes);

const router = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

// Export router for type inference. This is required.
export { router };
