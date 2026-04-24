import { useForm } from "@tanstack/react-form";
import { Drawer } from "@/kumi-ui/components/Drawer/Drawer.tsx";
import { Button, Input } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { useHabits } from "~/server/api/habits.api.ts";
export const CreateHabitDrawer = () => {
	const { isOpen, set } = useDrawer("habits", "create");
	const {
		actions: { createHabit },
	} = useHabits();
	const form = useForm({
		defaultValues: {
			name: "",
		},
		onSubmit: ({ value }) => {
			console.log("Submit ", value);
			createHabit(value, {
				onSuccess: () => {
					set(false);
				},
			});
		},
	});

	return (
		<Drawer title="Create habit" open={isOpen} onOpenChange={(v) => set(v)}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(e);
				}}
				className={kumi({ display: "flex", flexDirection: "column", gap: "8px" })}
			>
				<form.Field name="name">
					{({ state, handleChange }) => {
						return (
							<Input
								placeholder="Habit name"
								value={state.value}
								onChange={(e) => handleChange(e.target.value)}
							/>
						);
					}}
				</form.Field>
				<Button
					type="submit"
					className={kumi({
						width: "100%",
					})}
				>
					Create
				</Button>
			</form>
		</Drawer>
	);
};
