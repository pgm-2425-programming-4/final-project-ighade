import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Backlog } from './PaginatedBacklog/Backlog';
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Backlog></Backlog>
    </QueryClientProvider>
  );
}

export default App
