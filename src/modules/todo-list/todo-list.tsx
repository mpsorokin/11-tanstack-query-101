import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useState } from "react";

export function TodoList() {
  const [page, setPage] = useState(1);
  const {
    data: todoItems,
    error,
    isPending,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-4">
      <h1 className="text-3xl font-bold underline mb-1">todo list</h1>
      <div className="flex flex-col gap-3">
        {todoItems.data.map((todo) => (
          <div className="border border-slate-500 rounded-xl p-3" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      <div className="mt-3   flex gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-3 rounded border border-teal-500 cursor-pointer"
        >
          prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages))}
          className="p-3 rounded border border-teal-500 cursor-pointer"
        >
          next
        </button>
      </div>
    </div>
  );
}
