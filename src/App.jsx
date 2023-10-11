import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Invites from './components/Home/Invites'
import Projects from './components/Home/Projects'
import Home from './pages/Home'
import CreateRoutes from './routes'

function App() {

  return (
    <>
      <BrowserRouter>
          <Header />
          <main className="max-w-6xl my-0 mx-auto justify-between px-8">
            <CreateRoutes />
          </main>
      </BrowserRouter>  
    </>
  )
}

export default App
