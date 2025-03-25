import { useTodoList } from "./use-todo-list.tsx";

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
