import { Box, Container } from '@mui/material';
import Title from '../../../components/Title';
import studentsImage from '../../../assets/login/students.png';

const LoginStudent = () => {
  return (
    <Container
      component="section"
      sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
    >
      <Box component="figure">
        <Box component="img" src={studentsImage} alt="Estudantes" />
      </Box>
      <Box sx={{ justifyContent: 'center' }}>
        <Title sx={{ textAlign: 'center' }}>Bem Vindo(a)</Title>
      </Box>
    </Container>
  );
};

export default LoginStudent;
