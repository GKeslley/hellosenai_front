import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';

const CreateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/projetos" element={<Project />}></Route>
    </Routes>
  );
};

export default CreateRoutes;
