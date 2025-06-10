import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import Projects from '../pages/projects';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/projects/$id',
  component: Projects,
});