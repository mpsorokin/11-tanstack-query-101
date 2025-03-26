import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux.ts";

type AuthState = {
  userId: string | null;
  loginError?: string | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId"),
    error: null,
  } as AuthState,
  selectors: {
    userId: (state) => state.userId,
    loginError: (state) => state.loginError,
  },
  reducers: {
    addUser: (state, action: PayloadAction<{ userId: string }>) => {
      localStorage.setItem("userId", action.payload.userId);
      state.userId = action.payload.userId;
    },
    removeUser: (state) => {
      state.userId = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload;
    },
  },
}).injectInto(rootReducer);
