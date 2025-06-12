import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import Backlog from '../pages/PaginatedBacklog/Backlog';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/projects/$id/backlog',
  component: Backlog,
});