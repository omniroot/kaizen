import { GlobalLayout } from "@/layouts/global.layout.tsx";
import { NotFoundPage } from "@/pages/notfound/notfound.page.tsx";
import { OverviewRoute } from "@/pages/overview/overview.page.tsx";
import { createRootRoute, createRouter } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <GlobalLayout />,
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
