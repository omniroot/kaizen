import { useHabitCreate } from "@/api/habits/habits.api.ts";
import { IconPicker } from "@/components/IconPicker/IconPicker.tsx";
import { useHabitStore } from "@/stores/habit.store.tsx";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  HStack,
  Input,
  Portal,
  Spacer,
  Text,
} from "@chakra-ui/react";
// import { IconImageInPicture } from "@tabler/icons-react";

import { useState } from "react";

const colorPalletes = [
  { name: "Peach", color: "#FFA878" },
  { name: "Gold", color: "#FECB62" },
  { name: "Lime", color: "#EBEE58" },
  { name: "Light Green", color: "#BFF567" },
  { name: "Spring Green", color: "#7BED76" },
  { name: "Turquoise", color: "#41EB9D" },
  { name: "Aqua", color: "#29DFCE" },
  { name: "Sky Blue", color: "#56CFEB" },
  { name: "Light Blue", color: "#74B4FF" },
  { name: "Lavender", color: "#8F9DFE" },
  { name: "Purple", color: "#B18DFF" },
  { name: "Pink", color: "#EA7BFF" },
  { name: "Hot Pink", color: "#FF75B7" },
  { name: "Salmon", color: "#FE7079" },
];

const goalsList = [
  { name: "Task", value: "task" },
  { name: "Count", value: "count" },
  { name: "Time", value: "time" },
];

const dayslist = [
  { name: "Mon", value: "monday" },
  { name: "Tue", value: "tuesday" },
  { name: "Wed", value: "wednesday" },
  { name: "Thu", value: "thursday" },
  { name: "Fri", value: "friday" },
  { name: "Sat", value: "saturday" },
  { name: "Sun", value: "sunday" },
];

export const CreateHabitDrawer = () => {
  const { isHabitDrawerOpen, toggleDrawerOpen } = useHabitStore();
  const { mutate: createHabit } = useHabitCreate();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Heart");
  const [selectedColor, setSelectedColor] = useState("#8F9DFE");
  const [selectedGoal, setSelectedGoal] = useState("task");
  const [selectedRepeats, setSelectedRepeats] = useState(["monday"]);

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const toggleSelectedDay = (day: string) => {
    if (selectedRepeats.includes(day)) {
      const nextState = selectedRepeats.filter((d) => d !== day);
      setSelectedRepeats(nextState);
      return;
    }

    setSelectedRepeats((prev) => [...prev, day]);
  };

  const onCreateHabitClick = () => {
    createHabit({
      title: selectedTitle,
      color: selectedColor,
      icon: selectedIcon,
      type: selectedGoal,
      repeat: selectedRepeats,
    });
  };

  // console.log({
  //   selectedTitle,
  //   selectedColor,
  //   selectedIcon,
  //   selectedGoal,
  //   selectedRepeats,
  // });

  return (
    <Drawer.Root
      placement={"bottom"}
      open={isHabitDrawerOpen}
      onOpenChange={(e) => toggleDrawerOpen(e.open)}
    >
      <Portal>
        <Drawer.Backdrop backdropFilter={"blur(5px)"} />
        <Drawer.Positioner>
          <Drawer.Content
            bg={"surface"}
            borderRadius={"24px"}
            boxShadow={"none"}
            animationDuration={"400ms"}
          >
            <Drawer.Header justifyContent={"center"}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Create
              </Text>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body p={"12px"}>
              <HStack>
                <IconPicker
                  value={selectedIcon}
                  onChange={setSelectedIcon}
                  selectedColor={selectedColor}
                  w="48px"
                  h="48px"
                />
                {/* <Box
                 
                  onClick={() => toggleIconPickerDrawerOpen(true)}
                >
                  <IconPreview name={icon} />
                </Box> */}
                <Input
                  placeholder="Name"
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.currentTarget.value)}
                  bg={"surface_container"}
                  size={"xl"}
                  padding={"18px"}
                  borderRadius={"12px"}
                />
              </HStack>
              <HStack
                w="100%"
                justifyContent={"space-between"}
                wrap={"wrap"}
                p={"12px 0px"}
                gap={"12px"}
                userSelect={"none"}
              >
                {colorPalletes.map((color) => {
                  return (
                    <Box
                      bg={color.color}
                      boxShadow={color.color}
                      shadow={
                        color.color === selectedColor
                          ? `2px 2px 15px 2px ${color.color}`
                          : ""
                      }
                      transition={"box-shadow 200ms"}
                      onClick={() => setSelectedColor(color.color)}
                      w={"42px"}
                      h={"42px"}
                      borderRadius={"16px"}
                    ></Box>
                  );
                })}
              </HStack>
              <Text
                color={"subtext"}
                fontSize={"20px"}
                fontWeight={"medium"}
                p={"12px 4px"}
              >
                Goal
              </Text>
              <HStack
                justifyContent={"space-between"}
                bg={"surface_container"}
                borderRadius={"18px"}
              >
                {goalsList.map((goal) => {
                  const isSelected = goal.value === selectedGoal;
                  return (
                    <HStack
                      bg={isSelected ? selectedColor : "transparent"}
                      color={isSelected ? "black" : "text"}
                      justifyContent={"center"}
                      w="100%"
                      p={"10px 28px"}
                      borderRadius={isSelected ? "14px" : "4px"}
                      onClick={() => setSelectedGoal(goal.value)}
                      cursor={"pointer"}
                      transition={"background-color 200ms, border-radius 200ms"}
                    >
                      {goal.name}
                    </HStack>
                  );
                })}
              </HStack>
              <Text
                color={"subtext"}
                fontSize={"20px"}
                fontWeight={"medium"}
                p={"12px 4px"}
              >
                Repeat
              </Text>
              <HStack justifyContent={"space-between"} gap={"6px"} w={"100%"}>
                {dayslist.map((day) => {
                  const isSelected = selectedRepeats.includes(day.value);
                  return (
                    <HStack
                      minW={"48px"}
                      h={"45px"}
                      bg={isSelected ? selectedColor : "surface_container"}
                      color={isSelected ? "black" : "text"}
                      onClick={() => toggleSelectedDay(day.value)}
                      justifyContent={"center"}
                      borderRadius={"16px"}
                      fontSize={"14px"}
                      cursor={"pointer"}
                      transition={"background 200ms, color 200ms"}
                      p="12px"
                    >
                      {day.name}
                    </HStack>
                  );
                })}
              </HStack>
              <Spacer h={"20px"} />
              <Button
                w="100%"
                h={"fit-content"}
                bg={selectedColor}
                color={"black"}
                p={"18px 12px"}
                _active={{ scale: 0.95 }}
                borderRadius={"24px"}
                onClick={onCreateHabitClick}
              >
                Create
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
