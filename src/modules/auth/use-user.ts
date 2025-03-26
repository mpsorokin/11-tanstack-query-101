import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api.ts";
import { useAppSelector } from "../../shared/redux.ts";
import { authSlice } from "./auth.slice.ts";

export function useUser() {
  const userId = useAppSelector(authSlice.selectors.userid);

  return useQuery({
    ...authApi.getUserById(userId!),
    enabled: Boolean(userId),
  });
}
