import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import About from '../pages/About';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/about',
  component: About,
});