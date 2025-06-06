import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './root';
import Dashbord from '../pages/dashbord';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Dashbord,
});