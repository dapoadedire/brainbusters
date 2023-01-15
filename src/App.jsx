import "./App.css";
import QuizHome from "./components/QuizHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <QuizHome />
      </div>
    </QueryClientProvider>
  );
}

export default App;
