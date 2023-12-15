import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import teacherImage from '../../assets/login/pvta.png';
import warningImage from '../../assets/teste2.png';
import adm from '../../assets/login/sla.png';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';

const Adm = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Title>Tela do Administrador</Title>
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Paper
          component={Link}
          to="/adm/professor"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
        >
          <Avatar
            src={teacherImage}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Novo Professor
          </Typography>
        </Paper>

        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
          component={Link}
          to="/adm/denuncias"
        >
          <Avatar
            src={warningImage}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Denúncias
          </Typography>
        </Paper>

        <Paper
          component={Link}
          to="/adm/registrar"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
        >
          <Avatar
            src={adm}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Novo ADM
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Adm;
