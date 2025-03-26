import { AppThunk } from "../../shared/redux.ts";
import { authSlice } from "./auth.slice.ts";
import { queryClient } from "../../shared/api/query-client.ts";

export const logoutThunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(authSlice.actions.removeUser());

    localStorage.removeItem("userId");
    // remove errors
    dispatch(authSlice.actions.setError(null));

    queryClient.removeQueries();
  } catch (_) {
    dispatch(authSlice.actions.setError("Error"));
  }
};
