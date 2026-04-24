import { DentalToothIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, type FC } from "react";
import { Button, Typo } from "@/kumi-ui/index.ts";

import { kumi } from "@/kumi-ui/kumi.ts";
import type { Task } from "~/server/schema/task.schema.ts";
import { Box, Checkbox, HStack, VStack } from "@chakra-ui/react";
import { bg } from "zod/v4/locales";
import { useTask, useTasks } from "~/server/api/tasks.api";
import {} from "@uidotdev/usehooks";
import { useHover } from "@uidotdev/usehooks";
import { IconGripVertical } from "@tabler/icons-react";

interface IProps {
  task: Task;
}

export const TaskItem: FC<IProps> = ({ task }) => {
  const {
    actions: { updateTask },
  } = useTask({ id: task.id });
  const [ref, isHover] = useHover();

  return (
    <HStack
      w={"100%"}
      p={"8px"}
      justify={"space-between"}
      align={"center"}
      borderRadius={"21px"}
      position={"relative"}
      ref={ref}
    >
      <Box
        position={"absolute"}
        left={"-30px"}
        color={"text-low"}
        opacity={isHover ? "1" : "0"}
        scale={isHover ? "1" : "0.95"}
        transition={"opacity 200ms, scale 200ms"}
        cursor={"grab"}
        p={"8px"}
      >
        <IconGripVertical />
      </Box>
      <HStack gap={"8px"}>
        <Checkbox.Root
          checked={task.status === "completed"}
          onCheckedChange={(v) =>
            updateTask({ status: !!v.checked ? "completed" : "todo" })
          }
        >
          <Checkbox.Control
            w={"30px"}
            h={"30px"}
            border={"2px solid {colors.primary}"}
            color={"on-primary"}
            borderRadius={"12px"}
            transition={"background 200ms"}
            _icon={{
              w: "18px",
              color: "on-primary",
              h: "18px",
            }}
            _checked={{
              bg: "primary",
            }}
          />
          <Checkbox.HiddenInput />
        </Checkbox.Root>

        <VStack align={"start"} gap={"4px"}>
          <Typo variant={"title"} size="sm">
            {task.name}
          </Typo>
          <HStack gap={"4px"}>{/*<Typo color={"green"}>#life</Typo>*/}</HStack>
        </VStack>
      </HStack>

      <div className={kumi({})}></div>
    </HStack>
  );
};
