import { TextEditor } from "@/components/TextEditor/TextEditor.tsx";
import { WeekPanel } from "@/components/WeekPanel/WeekPanel.tsx";
import { useHabitStore } from "@/stores/habit.store.tsx";
import { Button, Textarea } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/");

export const OverviewPage = () => {
  const data = route.useLoaderData();
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

      <TextEditor />
      <Button
        position={"fixed"}
        bottom={"80px"}
        right={"40px"}
        variant={"surface"}
        size={"lg"}
        _icon={{ w: "24px", h: "24px" }}
        _active={{ scale: 0.95 }}
        borderRadius={"24px"}
        onClick={() => toggleDrawerOpen(true)}
      >
        <IconPlus />
        Create
      </Button>
      {/* <HabitsList /> */}
    </>
  );
};
