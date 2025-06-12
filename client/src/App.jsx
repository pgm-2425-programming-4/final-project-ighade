import {
  RouterProvider,
  createRouter,
} from '@tanstack/react-router';

import { Route as rootRoute } from './routes/__root';
import { Route as dashboardRoute } from './routes/dashboard';
import { Route as projectsRoute } from './routes/projects';
import { Route as backlogRoute } from './routes/backlog';
import { Route as aboutRoute } from './routes/about';

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  backlogRoute,
  projectsRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
