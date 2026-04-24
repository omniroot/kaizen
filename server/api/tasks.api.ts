import { useMutation, useQuery } from "@tanstack/react-query";
import { api, tanstackQueryClient } from "@/api/api.ts";
import type {
  CreateTask,
  Task,
  UpdateTask,
} from "~/server/schema/task.schema.ts";

const queryKey = "tasks";

const refetchTasks = () =>
  tanstackQueryClient.invalidateQueries({ queryKey: ["list", queryKey] });

export const useTasks = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["list", queryKey],
    queryFn: async () => {
      const res = await api.tasks.$get();
      if (res.status !== 200) {
        console.log(res);
        throw new Error(res.statusText);
      }
      return res.json();
    },
  });

  const { mutateAsync: createTask, isPending: createTaskPending } = useMutation<
    Task,
    unknown,
    CreateTask
  >({
    mutationFn: async (task) => {
      const res = await api.tasks.$post({ json: task });
      if (res.status !== 201) {
        console.log(res);
        throw new Error(res.statusText);
      }
      return res.json();
    },
    onSuccess: () => {
      refetchTasks();
    },
  });

  return {
    tasks,
    isLoading,
    actions: { createTask },
    actionsStatus: { createTaskPending },
  };
};

interface UseTask {
  id: Task["id"];
}

export const useTask = ({ id }: UseTask) => {
  const { tasks } = useTasks();
  const task = tasks?.filter((t) => t.id === id)[0];

  const { mutateAsync: updateTask, isPending: updateTaskPending } = useMutation<
    Task,
    unknown,
    UpdateTask
  >({
    mutationFn: async (task) => {
      const res = await api.tasks[":id"].$patch({
        param: { id: id },
        json: task,
      });

      if (res.status !== 200) {
        throw new Error(res.statusText);
      }

      return res.json();
    },
    onSuccess: () => {
      refetchTasks();
    },
  });

  return { task, actions: { updateTask } };
};
