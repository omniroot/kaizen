import { GlobalLayout } from "@/layouts/global.layout.tsx";
import { AuthPage } from "@/pages/auth.page.tsx";
import { NotFoundPage } from "@/pages/notfound/notfound.page.tsx";
import { OverviewPage } from "@/pages/overview/overview.page.tsx";
import { ProfilePage } from "@/pages/profile.page.tsx";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <GlobalLayout />,
});

export const OverviewRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <OverviewPage />,
  loader: () => {
    console.log(123123);
    return 123;
  },
});

export const ProfileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: () => <ProfilePage />,
});

export const AuthRoute = createRoute({
  path: "/auth",
  getParentRoute: () => rootRoute,
  component: () => <AuthPage />,
});

const routeTree = rootRoute.addChildren([
  OverviewRoute,
  ProfileRoute,
  AuthRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => <NotFoundPage />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
