import { Typo } from "@/kumi-ui/components/Typo/Typo.tsx";
import { VStack } from "@/kumi-ui/index.ts";

export const HelloSection = () => {
	// const { selectedDate } = useApp();
	// const displayDate = ddate.getRelativeLabel(selectedDate);
	// const displayFullNiceDate = ddate.getFullNiceDate(selectedDate);
	// const { activities, raw: activitiesRaw } = useActivities({ type: "list" });
	// const { activityEntries } = useActivityEntries({ date: { equal: selectedDate } });
	// const { journalEntries } = useJournal({
	// 	type: "list",
	// 	queries: { date: { equal: selectedDate } },
	// });
	const displayDate = "Today";
	// const displayFullNiceDate = "Nice date";

	// const completedActivitiesCount = 1;
	// const activities = [];
	// const journalEntries = [];
	// const {} = activityEntri

	// const completedActivitiesCount = activityEntries?.filter((a) => a.completed).length;

	// const { toggle: toggleDaySelectDrawer } = useDrawers("day-select");

	const onRefreshClick = () => {
		// activitiesRaw.refetch.list();
		// refetchActivityEntries.list({});
	};

	return (
		<VStack
			w={"100%"}
			align={"start"}
			justify={"center"}
			gap={"sm"}
			// px={"xl"}
			// py={"xl"}
			// borderRadius={"md"}
			bg={"surface-container"}
		>
			<Typo variant={"title"}>{displayDate || "Date"}</Typo>
			{/* <Text>{displayDate}</Text> */}
			{/* <HStack w={"100%"} justifyContent={"space-between"} alignItems={"center"}> */}
			{/* <IconButton borderRadius={"full"} variant={"ghost"} onClick={onRefreshClick}>
					<IconRefresh />
				</IconButton> */}
			{/* </HStack> */}
			{/* <Button
				h={"auto"}
				variant={"ghost"}
				alignItems={"center"}
				px={2}
				py={1}
				ml={"-md"}
				bg={{ _hover: "surface-container" }}
				borderRadius={"12px"}
			>
				<Icon w={"18px"} color={"primary"}>
					<IconCalendar />
				</Icon>
				<Typo size={"md"} color={"on-surface-dark"}>
					{displayFullNiceDate}
				</Typo>
				<Icon w={"18px"} color={"on-surface-dark"}>
					<IconChevronDown />
				</Icon>
			</Button>
			<HStack gap={"10px"} color={"on-surface-dark"}>
				<HStack>
					<Box w={"5px"} h={"5px"} bg={"primary"} borderRadius={"50%"} />
					<Typo size={"sm"}>
						{completedActivitiesCount} / {activities?.length} activities
					</Typo>
				</HStack>
				<HStack>
					<Box w={"5px"} h={"5px"} bg={"outline"} borderRadius={"50%"} />
					<Typo size={"sm"}>{journalEntries?.length} notes</Typo>
				</HStack>
			</HStack> */}
		</VStack>
	);
};
