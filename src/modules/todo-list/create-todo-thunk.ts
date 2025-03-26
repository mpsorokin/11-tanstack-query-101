import { AppThunk } from "../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api.ts";
import { nanoid } from "nanoid";
import { authSlice } from "../auth/auth.slice.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "../auth/api.ts";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (_, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("User ID is missing");
    }

    // get data from cache
    const user = await queryClient.fetchQuery(authApi.getUserById(userId));

    const newTodo: TodoDto = {
      id: nanoid(),
      done: false,
      text: `${text}, owner: ${user.login}`,
      userId,
    };

    queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] });

    queryClient.setQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
      (tasks) => [...(tasks ?? []), newTodo],
    );

    await new MutationObserver(queryClient, {
      mutationFn: todoListApi.createTodo,
    }).mutate(newTodo);

    queryClient.invalidateQueries({
      queryKey: [todoListApi.baseKey],
    });
  };

export const useCreateLoading = () =>
  useMutation({
    mutationKey: ["create-todo"],
  }).isPending;
