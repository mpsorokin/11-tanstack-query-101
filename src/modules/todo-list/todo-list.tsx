import { useTodoList } from "./use-todo-list.tsx";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { nanoid } from "nanoid";

export function TodoList() {
  const { error, todoItems, isPending, cursor } = useTodoList();

  /*const {
    data: todoItems,
    error,
    isPending,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
  });*/

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
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

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-4">
      <h1 className="text-3xl font-bold underline mb-1">todo list</h1>

      <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
        <input
          className="rounded p-2 border border-teal-500"
          type="text"
          name="title"
        />
        <button className="rounded p-2 border border-teal-500">Create</button>
      </form>

      <div className="flex flex-col gap-3">
        {todoItems?.map((todo) => (
          <div className="border border-slate-500 rounded-xl p-3" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
}
