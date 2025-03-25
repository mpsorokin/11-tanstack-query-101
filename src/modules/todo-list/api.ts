import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance.ts";

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
  id: string;
  text: string;
  done: boolean;
  userId: number;
};

export const todoListApi = {
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    const res = await fetch(`${BASE_URL}/tasks?_page=${page}`, { signal });
    return await (res.json() as Promise<PaginatedResult<TodoDto>>);
  },

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: ["tasks", "list"],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/tasks`, {
          signal: meta.signal,
        }),
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>(`/tasks`, {
      method: "POST",
      json: data,
    });
  },
  updateTodo: (id: number, data: Partial<TodoDto>) => {
    return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo: (id: number) => {
    return jsonApiInstance<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
