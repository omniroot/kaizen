import { DentalToothIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { IconFlame } from "@tabler/icons-react";
import { type FC, useState } from "react";
import { Box, Button, HStack, Typo, VStack } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { useKaizen } from "@/stores/kaizen.store.tsx";
import type { Habit } from "~/server/schema/habit.schema.ts";

function isHexColor(value: string | null | undefined): boolean {
	const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
	return hexColorRegex.test(value || "");
}

interface IProps {
	habit: Habit;
}

export const HabitItem: FC<IProps> = ({ habit }) => {
	const [checked, setChecked] = useState(false);
	const { setSelectedHabitId } = useKaizen();
	const { open } = useDrawer("habits", "view");

	const onHabitClick = () => {
		// setSelectedHabitId(habit.id);
		open({ id: habit.id });
	};

	return (
		<HStack
			w={"100%"}
			p={"8px"}
			justify={"space-between"}
			className={kumi({
				transition: "background-color 200ms",
				borderRadius: "21px",
				gap: "8px",
				"&:hover": {
					backgroundColor: "secondary-ghost-hover",
				},
			})}
			// bg={{ base: "surface_container", _hover: "surface_container_high" }}
			// transition={"backgrounds"}
			// borderRadius={"24px"}
			// cursor={"pointer"}
			onClick={onHabitClick}
		>
			<HStack
				className={kumi({
					gap: "8px",
				})}
			>
				<Box
					className={kumi({
						width: "38px",
						height: "38px",
						borderRadius: "14px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "secondary",
						color: "on-secondary",
					})}
				>
					{/* <DynamicIcon name={habit.icon_name as IconName} size={"22px"} /> */}
					<HugeiconsIcon
						icon={DentalToothIcon}
						width={"22px"}
						height={"22px"}
						strokeWidth={2}
					/>
				</Box>
				{/* <HStack
					w={"38px"}
					h={"38px"}
					// p={"18px"}
					// color={"text-alt"}
					bg={"surface-high"}
					justify="center"
					align="center"
					radius={"md"}
					// style={{
					// 	backgroundColor: isHexColor(habit?.color)
					// 		? `${habit?.color}`
					// 		: `var(--chakra-colors-primary`,
					// }}
				>
					
				</HStack> */}
				<VStack gap={"4px"}>
					<Typo variant={"title"}>{habit.name}</Typo>
					<HStack gap={"4px"} color={"tertiary"}>
						<IconFlame size={"16px"} />
						<Typo variant={"subtext"}>14 days</Typo>
					</HStack>
					{/* <Typo>habit</Typo> */}
				</VStack>
			</HStack>

			<div className={kumi({})}>
				<Button variant={habit.status === "active" ? "tertiary" : "primary"}>
					{habit.status}
				</Button>
				{/* <Checkbox /> */}

				{/* <IconButton onClick={() => setChecked((prev) => !prev)}>
					{checked ? (
						<IconCircleCheckFilled size={"32px"} />
					) : (
						<IconCircle size={"32px"} />
					)}
				</IconButton> */}
			</div>
		</HStack>
	);
};
