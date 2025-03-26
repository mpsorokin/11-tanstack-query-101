import { AppThunk } from "../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "./api.ts";
import { authSlice } from "./auth.slice.ts";

export const loginThunk =
  (login: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const mutationResult = await new MutationObserver(queryClient, {
        mutationKey: ["login"],
        mutationFn: authApi.loginUser,
      }).mutate({ login, password });

      if (mutationResult) {
        dispatch(
          authSlice.actions.addUser({
            userId: mutationResult.id,
          }),
        );
        dispatch(authSlice.actions.setError(null));
      }

      dispatch(authSlice.actions.setError("Login or password invalid"));
    } catch (_) {
      dispatch(authSlice.actions.setError("Error"));
    }
  };

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"],
  }).isPending;
