import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const getTasks = () => {
  return new Promise<Todo[]>((res) => {
    setTimeout(() => {
      res([
        {
          id: 1,
          text: "Tanstack Query 101",
          done: false,
        },
        {
          id: 2,
          text: "Tanstack Query 201",
          done: false,
        },
        {
          id: 3,
          text: "Tanstack Query 202",
          done: false,
        },
        {
          id: 4,
          text: "Tanstack Query 203",
          done: false,
        },
        {
          id: 5,
          text: "Tanstack Query 204",
          done: false,
        },
      ]);
    }, 1000);
  });
};

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: getTasks,
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
