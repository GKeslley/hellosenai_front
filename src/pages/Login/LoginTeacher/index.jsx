import { Box, Container, useMediaQuery } from '@mui/material';
import teacherImage from '../../../assets/login/teacher.png';
import LoginForm from '../../../components/Login/LoginForm';

const LoginTeacher = () => {
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
          <Box component="img" src={teacherImage} alt="Estudantes" />
        </Box>
      )}

      <LoginForm isTeacher={true} />
    </Container>
  );
};

export default LoginTeacher;
