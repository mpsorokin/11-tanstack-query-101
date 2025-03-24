import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>hello</h1>
    </QueryClientProvider>
  );
}

export default App;
