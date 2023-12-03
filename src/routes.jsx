import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Invites from './pages/Invites';
import Profile from './pages/Profile';
import Login from './pages/Login';
import LoginStudent from './pages/Login/LoginStudent';
import LoginTeacher from './pages/Login/LoginTeacher';
import Challenges from './pages/Challenges';
import ChallengeInfos from './pages/Challenges/ChallengeInfos';

const CreateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/login/aluno/*" element={<LoginStudent />}></Route>
      <Route path="/login/professor" element={<LoginTeacher />}></Route>
      <Route path="/projetos" element={<Projects />}></Route>
      <Route path="/projetos/:slug" element={<Project />}></Route>
      <Route path="/convites" element={<Invites />}></Route>
      <Route path="/desafios" element={<Challenges />}></Route>
      <Route path="/desafios/:user" element={<ChallengeInfos />}></Route>
      <Route path="/perfil/*" element={<Profile />}></Route>
    </Routes>
  );
};

export default CreateRoutes;
