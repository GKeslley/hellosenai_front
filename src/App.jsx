import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateRoutes from './routes';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Header />
            <main className="flex-1">
              <CreateRoutes />
            </main>
            <Footer />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
