import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./components/HomePage";

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
      
        <Quiz />
    
    </QueryClientProvider>
  );
}

export default App;
