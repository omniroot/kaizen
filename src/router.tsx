import {
	createRootRoute,
	createRoute,
	createRouter,
	redirect,
} from "@tanstack/react-router";
import { HabitsPage } from "@/pages/HabitsPage.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { OverviewPage } from "@/pages/OverviewPage.tsx";
import { RootLayout } from "@/pages/RootLayout.tsx";
import { TasksPage } from "@/pages/TasksPage.tsx";

// export const router = createRouter({ routeTree });

// declare module "@tanstack/react-router" {
// 	interface Register {
// 		router: typeof router;
// 	}
// }

// HMR: Clear router match cache on module hot update
// if (import.meta.hot) {
// 	import.meta.hot.accept("./routeTree.gen.ts", () => {
// 		router.invalidate();
// 	});
// }

// import { GlobalLayout } from "@/layouts/global.layout.tsx";
// import { AuthPage } from "@/pages/auth.page.tsx";
// import { NotFoundPage } from "@/pages/notfound/notfound.page.tsx";
// import { OverviewPage } from "@/pages/overview/overview.page.tsx";
// import { ProfilePage } from "@/pages/profile.page.tsx";
// import {
//   createRootRoute,
//   createRoute,
//   createRouter,
// } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
	component: () => <RootLayout />,
});

export const HomeRoute = createRoute({
	path: "/",
	getParentRoute: () => rootRoute,
	component: () => <HomePage />,
	loader: ({ location }) => {
		if (location.pathname === "/") {
			throw redirect({ to: "/overview" });
		}
	},
});

export const OverviewRoute = createRoute({
	path: "/overview",
	getParentRoute: () => HomeRoute,
	component: () => <OverviewPage />,
});

export const HabitsRoute = createRoute({
	path: "/habits",
	getParentRoute: () => HomeRoute,
	component: () => <HabitsPage />,
});

export const TasksRoute = createRoute({
	path: "/tasks",
	getParentRoute: () => HomeRoute,
	component: () => <TasksPage />,
});

const routeTree = rootRoute.addChildren([
	HomeRoute,
	OverviewRoute,
	HabitsRoute,
	TasksRoute,
	// ProfileRoute,
	// AuthRoute,
]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	// defaultNotFoundComponent: () => <NotFoundPage />,
	defaultNotFoundComponent: () => <>not found</>,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// export const OverviewRoute = createRoute({
//   path: "/",
//   getParentRoute: () => rootRoute,
//   component: () => <OverviewPage />,
// });

// export const ProfileRoute = createRoute({
//   path: "/profile",
//   getParentRoute: () => rootRoute,
//   component: () => <ProfilePage />,
// });

// export const AuthRoute = createRoute({
//   path: "/auth",
//   getParentRoute: () => rootRoute,
//   component: () => <AuthPage />,
// });
