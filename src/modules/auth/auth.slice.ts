import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux.ts";

type AuthState = {
  userId: string | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId"),
  } as AuthState,
  reducers: {
    addUser: (state, action: PayloadAction<{ userId: string }>) => {
      localStorage.setItem("userId", action.payload.userId);
      state.userId = action.payload.userId;
    },
    removeUser: (state) => {
      state.userId = null;
    },
  },
}).injectInto(rootReducer);
