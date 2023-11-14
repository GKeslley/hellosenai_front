import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CreateRoutes from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <CreateRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
