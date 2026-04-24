import dayjs from "dayjs";
import { Button, Typo } from "@/kumi-ui/index.ts";
import type { Habit } from "~/server/schema/habit.schema.ts";

interface Props {
  entry: {
    date: string;
    id: string;
  };
  showDay?: "inside" | "upper";
}
export const HabitRecordItem: React.FC<Props> = ({
  entry,
  showDay = "inside",
}) => {
  // const [completed, setCompleted] = useState(entry.value >= entry.target);
  // const { data: habitRecord } = useGetHabitsRecords(
  // 	{
  // 		date: record.date,
  // 		habit_id: record.habit_id,
  // 	},
  // 	{ enabled: false },
  // );
  // const { mutate: createHabitRecord } = useCreateHabitRecord();
  // const { mutate: updateHabitRecord } = useUpdateHabitRecord();

  // const onHabitRecordClick = (event: MouseEvent<HTMLButtonElement>) => {
  // 	event.stopPropagation();
  // 	const nextCompletedState = !completed;
  // 	setCompleted(nextCompletedState);
  // 	if (habitRecord?.length) {
  // 		updateHabitRecord({
  // 			id: habitRecord[0].$id,
  // 			vars: { completed: nextCompletedState },
  // 		});
  // 		// toaster.create({ title: "Record already exist" });
  // 	} else {
  // 		createHabitRecord({
  // 			date: record.date,
  // 			habit_id: record.habit_id,
  // 			completed: nextCompletedState,
  // 			// id: habitRecord[0].$id,
  // 			// vars: { completed: nextCompletedState },
  // 		});
  // 		toaster.create({ title: "Record not found" });
  // 	}
  // 	console.log({ habitRecord });
  // };

  return (
    <Button
      key={entry.id}

      // w={"30px"}
      // h={"30px"}
      // bg={completed ? "primary" : "surface_container_highest"}
      // borderRadius={"md"}
      // position={"relative"}
      // justifyContent={"center"}
      // alignItems={"center"}
      // onClick={onHabitRecordClick}
    >
      <Typo
        color={"subtext2"}
        // position={showDay === "inside" ? "initial" : "absolute"}
        // top={"-30px"}
        // left={"6px"}
      >
        {dayjs(entry.date).date()}
      </Typo>
    </Button>
  );
};
