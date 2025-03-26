import { useAppDispath, useAppSelector } from "../../shared/redux.ts";
import React from "react";
import { loginThunk, useLoginLoading } from "./login-thunk.ts";
import { authSlice } from "./auth.slice.ts";

export function Login() {
  const dispatch = useAppDispath();

  const isLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    dispatch(loginThunk(login, password));
  };

  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl">Login</h1>
        <input
          className="p-5 rounded border border-slate-500"
          type="text"
          name="login"
          placeholder="Login"
        />
        <input
          className="p-5 rounded border border-slate-500"
          type="password"
          name="password"
          placeholder="Password"
        />
        {loginError && (
          <div className="bg-rose-800 text-white p-3 rounded">{loginError}</div>
        )}

        <button
          disabled={isLoading}
          className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
