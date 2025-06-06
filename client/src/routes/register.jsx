import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './root';
import Register from '../pages/register';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/register',
  component: Register,
});