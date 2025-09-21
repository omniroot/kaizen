import { GlobalLayout } from "@/layouts/global.layout.tsx";
import { NotFoundPage } from "@/pages/notfound/notfound.page.tsx";
import { OverviewPage } from "@/pages/overview/overview.page.tsx";
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

const routeTree = rootRoute.addChildren([OverviewRoute]);

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
