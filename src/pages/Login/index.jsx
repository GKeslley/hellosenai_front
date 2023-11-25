import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import Title from '../../components/Title';
import teacherImage from '../../assets/login/pvta.png';
import studentImage from '../../assets/login/pvt2.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <Title sx={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Escolha seu papel:
        </Title>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', 
        justifyContent: 'center' }}>
          <Link to="professor">
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 2rem',
                alignItems: 'center',
                gap: '1rem',
                minWidth: {xs: '15rem', sm: '20rem'},
                maxWidth: {xs: '15rem', sm: '20rem'},
              }}
            >
              <Avatar
                src={teacherImage}
                sx={{
                  objectPosition: 'top',
                  width: '120px',
                  height: '120px',
                  '& .MuiAvatar-img': {
                    objectPosition: 'top',
                  },
                }}
              />
              <Typography fontSize="1.5rem" fontWeight="500">
                Sou Professor
              </Typography>
            </Paper>
          </Link>

          <Link to="aluno">
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 2rem',
                alignItems: 'center',
                gap: '1rem',
                minWidth: {xs: '15rem', sm: '20rem'},
                maxWidth: {xs: '15rem', sm: '20rem'},
              }}
            >
              <Avatar
                src={studentImage}
                sx={{
                  objectPosition: 'top',
                  width: '120px',
                  height: '120px',
                  '& .MuiAvatar-img': { objectPosition: 'top' },
                }}
              />
              <Typography fontSize="1.5rem" fontWeight="500">
                Sou Aluno
              </Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
