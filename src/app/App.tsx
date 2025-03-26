import { TodoList } from "../modules/todo-list/todo-list.tsx";
import { useUser } from "../modules/auth/use-user.ts";
import { Login } from "../modules/auth/login.tsx";

function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return <TodoList />;
  }

  return <Login />;
}

export default App;
