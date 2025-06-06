import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './root';
import Login from '../pages/login';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/login',
  component: Login,
});