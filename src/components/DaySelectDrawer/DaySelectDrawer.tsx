import { useGlobalStore } from "@/stores/global.store.tsx";
import { CloseButton, Drawer, HStack, Portal, Text } from "@chakra-ui/react";

export const DaySelectDrawer = () => {
  const isDaySelectOpen = useGlobalStore((store) => store.isDaySelectOpen);
  const setDaySelectOpen = useGlobalStore((store) => store.setDaySelectOpen);

  return (
    <Drawer.Root
      placement={"top"}
      open={isDaySelectOpen}
      onOpenChange={(e) => setDaySelectOpen(e.open)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            bg={"surface"}
            borderRadius={"24px"}
            boxShadow={"none"}
          >
            <Drawer.Header justifyContent={"center"}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Create
              </Text>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <HStack></HStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
