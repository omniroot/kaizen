import { IconPlus } from "@tabler/icons-react";
import type { FC } from "react";
import { TaskItem } from "@/components/tasks/TaskItem.tsx";
import { VStack } from "@/kumi-ui/components/VStack/VStack.tsx";
import { HStack, IconButton, Typo } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import type { HabitsFilters } from "~/server/api/habits.api.ts";
import { useTasks } from "~/server/api/tasks.api.ts";

interface TasksList {
	filters?: HabitsFilters;
}

export const TasksList: FC<TasksList> = ({ filters }) => {
	const { tasks } = useTasks();
	const { open } = useDrawer("tasks", "create");
	return (
		<VStack w={"100%"}>
			{/* {isFetching && <span>Loading...</span>} */}
			{tasks?.map((task) => {
				return <TaskItem key={task.id} task={task} />;
			})}
			<HStack
				w="100%"
				p={"8px"}
				gap={"8px"}
				align="center"
				className={kumi({
					transition: "background-color 200ms",
					borderRadius: "21px",
					cursor: "pointer",
					gap: "8px",
					"&:hover": {
						backgroundColor: "secondary-ghost-hover",
					},
				})}
				onClick={() => open()}
			>
				<IconButton>
					<IconPlus />
				</IconButton>
				<Typo variant="title">Add Task</Typo>
			</HStack>
		</VStack>
	);
};
