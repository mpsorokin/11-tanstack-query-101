const BASE_URL = "http://localhost:3011";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TodoDto = {
  id: number;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    const res = await fetch(`${BASE_URL}/tasks?_page=${page}`, { signal });
    return await (res.json() as Promise<PaginatedResult<TodoDto>>);
  },
};
