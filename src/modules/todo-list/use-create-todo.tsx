import React from "react";
import { useAppDispath } from "../../shared/redux.ts";
import { createTodoThunk } from "./create-todo-thunk.ts";

export function useCreateTodo() {
  const appDispatch = useAppDispath();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "");

    appDispatch(createTodoThunk(title));

    e.currentTarget.reset();
  };

  return { handleCreate };
}
