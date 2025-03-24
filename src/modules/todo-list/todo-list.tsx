import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: todoListApi.getTodoList,
  });

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <p>todo list</p>
      {data.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
