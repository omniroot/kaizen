import { useForm } from "@tanstack/react-form";
import { Button, Drawer, Input } from "@/kumi-ui/index.ts";
import { kumi } from "@/kumi-ui/kumi.ts";
import { useDrawer } from "@/stores/drawer.store.ts";
import { useTasks } from "~/server/api/tasks.api.ts";

export const CreateTaskDrawer = () => {
  const { isOpen, set } = useDrawer("tasks", "create");
  const {
    actions: { createTask },
  } = useTasks();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      createTask({ ...value, status: "todo" });
      set(false);
    },
  });

  return (
    <Drawer title="Create Task" open={isOpen} onOpenChange={(v) => set(v)}>
      <form.Field name="name">
        {({ state, handleChange }) => {
          return (
            <Input
              placeholder="Name"
              value={state.value}
              onChange={(v) => handleChange(v.target.value)}
            />
          );
        }}
      </form.Field>

      <Button
        className={kumi({ width: "100%" })}
        onClick={() => form.handleSubmit()}
      >
        Create
      </Button>
    </Drawer>
  );
};
