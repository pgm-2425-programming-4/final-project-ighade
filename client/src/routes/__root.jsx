import { createRootRoute } from '@tanstack/react-router';
import RouteLayout from '../pages/rootLayout';
export const Route = createRootRoute({
  component: RouteLayout,
});
export default Route;