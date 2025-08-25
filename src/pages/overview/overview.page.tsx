import { HabitsList } from "@/components/HabitsList/HabitsList.tsx";
import { WeekPanel } from "@/components/WeekPanel/WeekPanel.tsx";
import { rootRoute } from "@/pages/router.tsx";
import { useHabitStore } from "@/stores/habit.store.tsx";
import { Button } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { createRoute, getRouteApi } from "@tanstack/react-router";

export const OverviewRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <OverviewPage />,
  loader: () => {
    console.log(123123);
    return 123;
  },
  
});

export const OverviewPage = () => {
  const data = OverviewRoute.useLoaderData();
  // const [iconName, setIconName] = useState<IKaizenIconNames | null>(null);

  const { toggleDrawerOpen } = useHabitStore();
  return (
    <>
      <WeekPanel />
      {/* <KaizenIconPicker onSelect={(name) => setIconName(name)} />
      {iconName && <KaizenIcon name={iconName} />} */}
      {/* <HStack p={"12px"}>
        <CreateHabit />
      </HStack> */}
      <Button
        position={"fixed"}
        bottom={"80px"}
        right={"40px"}
        bg={"primary"}
        color={"black"}
        size={"xl"}
        _icon={{ w: "24px", h: "24px" }}
        _active={{ scale: 0.95 }}
        borderRadius={"24px"}
        onClick={() => toggleDrawerOpen(true)}
      >
        <IconPlus />
        Create
      </Button>
      <HabitsList />
    </>
  );
};
