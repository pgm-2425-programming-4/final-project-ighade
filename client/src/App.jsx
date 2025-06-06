import {
  RouterProvider,
  createRouter,
} from '@tanstack/react-router';

import { Route as rootRoute } from './routes/root';
import { Route as dashboardRoute } from './routes/dashboard';
import { Route as loginRoute } from './routes/login';
import { Route as registerRoute } from './routes/register';

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  loginRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
