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
import User from './pages/User';
import RegisterTeacher from './pages/Login/RegisterTeacher';
import Notifications from './pages/Notifications';
import Adm from './pages/Adm';
import Denounces from './components/Denounces';

const CreateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/login/aluno/*" element={<LoginStudent />}></Route>
      <Route path="/login/professor" element={<LoginTeacher />}></Route>
      <Route path="/login/professor/registro" element={<RegisterTeacher />}></Route>
      <Route path="/projetos" element={<Projects />}></Route>
      <Route path="/projetos/:slug" element={<Project />}></Route>
      <Route path="/convites" element={<Invites />}></Route>
      <Route path="/desafios/*" element={<Challenges />}></Route>
      <Route path="/perfil/*" element={<Profile />}></Route>
      <Route path="/usuario/:user/*" element={<User />}></Route>
      <Route path="/usuario/adm" element={<Adm />}></Route>
      <Route path="/usuario/adm/denuncias" element={<Denounces />}></Route>
      <Route path="/usuario/adm/professor" element={<Denounces />}></Route>
      <Route path="/notificacoes" element={<Notifications />}></Route>
    </Routes>
  );
};

export default CreateRoutes;
