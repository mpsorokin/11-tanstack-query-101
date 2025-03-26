import { TodoList } from "../modules/todo-list/todo-list.tsx";
import { useUser } from "../modules/auth/use-user.ts";
import { Login } from "../modules/auth/login.tsx";
import { LogoutButton } from "../modules/auth/logout-button.tsx";

function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }

  return <Login />;
}

export default App;
