import { Box, Container, useMediaQuery } from '@mui/material';
import studentsImage from '../../../assets/login/students.png';
import LoginForm from '../../../components/Login/LoginForm';
import RegisterForm from '../../../components/Login/RegisterForm';
import { Route, Routes } from 'react-router-dom';

const LoginStudent = () => {
  const isMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr',
        gap: '1rem',
        marginBottom: '2rem',
        marginTop: '2rem',
      }}
    >
      {isMobile && (
        <Box component="figure">
          <Box component="img" src={studentsImage} alt="Estudantes" />
        </Box>
      )}

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="registro" element={<RegisterForm />} />
      </Routes>
    </Container>
  );
};

export default LoginStudent;
