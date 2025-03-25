import { useTodoList } from "./use-todo-list.tsx";
import React from "react";
import { useCreateTodo } from "./use-create-todo.tsx";

export function TodoList() {
  const {
    error,
    todoItems,
    isPending,
    //refetch,
    //cursor
  } = useTodoList();

  const { handleCreate } = useCreateTodo();

  /*const {
    data: todoItems,
    error,
    isPending,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
  });*/

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
      {/*{cursor}*/}
    </div>
  );
}
