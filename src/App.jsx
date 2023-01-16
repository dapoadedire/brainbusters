import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./components/Quiz";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Quiz />
      </div>
    </QueryClientProvider>
  );
}

export default App;
