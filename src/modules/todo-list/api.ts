const BASE_URL = "http://localhost:3011";

export type TodoDto = {
  id: number;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodoList: ({ signal }: { signal: AbortSignal }) => {
    return fetch(`${BASE_URL}/tasks`, { signal }).then(
      (res) => res.json() as Promise<TodoDto[]>,
    );
  },
};
