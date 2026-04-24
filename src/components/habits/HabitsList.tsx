import { IconPlus } from "@tabler/icons-react";
import type { FC } from "react";
import { HabitItem } from "@/components/habits/HabitItem";
import { VStack } from "@/kumi-ui/components/VStack/VStack.tsx";
import { HStack, IconButton, Typo } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { type HabitsFilters, useHabits } from "~/server/api/habits.api.ts";

interface HabitsList {
	filters?: HabitsFilters;
}

export const HabitsList: FC<HabitsList> = ({ filters }) => {
	const { habits } = useHabits({ filters });
	const { open } = useDrawer("habits", "create");
	return (
		<VStack w={"100%"}>
			{/* {isFetching && <span>Loading...</span>} */}
			{habits?.map((habit) => {
				return <HabitItem key={habit.id} habit={habit} />;
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
				<Typo variant="title">Add habit</Typo>
			</HStack>
		</VStack>
	);
};
