import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../shared/api/query-client.ts";
import { TodoList } from "../modules/todo-list/todo-list.tsx";
import { Provider } from "react-redux";
import { store } from "../shared/redux.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TodoList />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
