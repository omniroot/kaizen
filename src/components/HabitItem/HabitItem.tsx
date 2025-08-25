import type { IHabit } from "@/api/supabase.interface.ts";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import {
  IconBrain,
  IconCircle,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { useState, type FC } from "react";
import styles from "./HabitItem.module.css";

function isHexColor(value: string | null | undefined): boolean {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  return hexColorRegex.test(value || "");
}

interface IProps {
  habit: IHabit;
}

export const HabitItem: FC<IProps> = ({ habit }) => {
  const [checked, setChecked] = useState(false);
  return (
    <HStack
      w={"100%"}
      p={"8px"}
      justifyContent={"space-between"}
      bg={{ base: "surface_container", _hover: "surface_container_high" }}
      transition={"backgrounds"}
      borderRadius={"24px"}
      cursor={"pointer"}
    >
      <HStack>
        <Box
          p={"14px"}
          borderRadius={"20px"}
          style={{
            backgroundColor: isHexColor(habit.color)
              ? `${habit.color}`
              : `var(--chakra-colors-kaizen_${habit.color})`,
          }}
        >
          <IconBrain size={"32px"} color="black" />
        </Box>
        <div className={styles.info}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {habit.title}
          </Text>
          <Text fontSize={"md"} fontWeight={"regular"}>
            habit
          </Text>
        </div>
      </HStack>

      <div className={styles.actions}>
        <Button
          variant={"ghost"}
          p={"0"}
          onClick={() => setChecked((prev) => !prev)}
        >
          {checked ? (
            <IconCircleCheckFilled size={"32px"} />
          ) : (
            <IconCircle size={"32px"} />
          )}
        </Button>
        {/* <Checkbox /> */}
      </div>
    </HStack>
  );
};
