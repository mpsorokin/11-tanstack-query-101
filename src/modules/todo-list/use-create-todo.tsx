import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import React from "react";
import { nanoid } from "nanoid";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = String(formData.get("title") ?? "");

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text: title,
      userId: 1,
    });

    e.currentTarget.reset();
  };

  return { handleCreate };
}
