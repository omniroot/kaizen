import { TasksList } from "@/components/tasks/TasksList.tsx";
import { Section } from "@/kumi-ui/index.ts";

export const TasksSection = () => {
	return (
		<Section title="Tasks">
			<TasksList />
		</Section>
	);
};
