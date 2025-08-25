import { useHabits } from "@/api/habits/habits.api.ts";
import { HabitItem } from "@/components/HabitItem/HabitItem.tsx";
import { VStack } from "@chakra-ui/react";

export const HabitsList = () => {
  const { data: habits, isFetching } = useHabits({});

  return (
    <VStack w={"100%"} p={"10px"}>
      {isFetching && <span>Loading...</span>}
      {habits?.map((habit) => {
        return <HabitItem habit={habit} />;
      })}
    </VStack>
  );
};
