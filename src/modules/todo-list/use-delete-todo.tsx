import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    },
    async onSuccess(_, deletedId) {
      const todos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
      );

      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter((item) => item.id !== deletedId),
        );
      }
    },
  });

  return { handleDelete: deleteTodoMutation.mutate };
}
