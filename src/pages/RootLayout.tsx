import { createRootRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { tanstackQueryClient } from "@/api/api.ts";
import { Header } from "@/components/Header/Header.tsx";
import { HabitDrawers } from "@/components/habits/HabitDrawers";
import { TasksDrawers } from "@/components/tasks/TaskDrawers.tsx";
import { useAppEvents } from "~/server/api/events.api.ts";

export const Route = createRootRoute({
  component: RootLayout,
});

export function RootLayout() {
  const event = useAppEvents();

  React.useEffect(() => {
    // if (event?.type === "external") {
    tanstackQueryClient.invalidateQueries({ refetchType: "all" });
    // }
  }, [event]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <HabitDrawers />
      <TasksDrawers />
    </React.Fragment>
  );
}
