import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';

const CreateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/projetos" element={<Projects />}></Route>
      <Route path="/projetos/:slug" element={<Project />}></Route>
    </Routes>
  );
};

export default CreateRoutes;
