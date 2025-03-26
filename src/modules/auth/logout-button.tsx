import { useAppDispath } from "../../shared/redux.ts";
import { logoutThunk } from "./logout-thunk.ts";

export function LogoutButton() {
  const dispatch = useAppDispath();

  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 p-3 rounded cursor-pointer"
    >
      Logout
    </button>
  );
}
