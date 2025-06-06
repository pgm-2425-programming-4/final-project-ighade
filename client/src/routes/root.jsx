import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav style={{ padding: 10, display: 'flex', gap: 10 }}>
        <a href="/">dashbord</a>
        <a href="/login">login</a>
        <a href="/register">register</a>
      </nav>
      <hr />
      <Outlet />
    </div>
  ),
});
