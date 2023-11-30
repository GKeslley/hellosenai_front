import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateRoutes from './routes';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContext from './contexts/UserContext';
import { Box } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserContext>
            <Header />
            <Box component='main' className="flex-1" sx={{minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
              <CreateRoutes />
            </Box>
            <Footer />
          </UserContext>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
