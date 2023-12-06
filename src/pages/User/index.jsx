import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import thumb from '../../assets/senai-user.jpg';
import NavLinkActive from '../../components/NavLink';
import { Route, Routes, useParams } from 'react-router-dom';
import UserProjects from './UserProjects';
import UserInvites from './UserInvites';

const User = () => {
  const params = useParams();

  return (
    <Box component="section" sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <Box sx={{ position: 'relative' }}>
        <Box component="figure" sx={{ height: '14rem' }}>
          <Box
            component="img"
            src={thumb}
            alt="Logo do Senai"
            sx={{ width: '100%', objectFit: 'cover', height: '100%' }}
          />
        </Box>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              gap: '2rem',
              position: 'absolute',
              bottom: '-100px',
            }}
          >
            <Avatar sx={{ width: '150px', height: '150px' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.1rem',
                marginBottom: '1rem',
              }}
            >
              <Typography fontWeight={800} fontSize="2rem">
                Kevin Smith
              </Typography>
              <Typography>Entrou em: 22/05/2023</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ display: 'grid', gap: '0.5rem', marginTop: '180px' }}>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0rem 5rem',
            marginBottom: '1rem',
          }}
        >
          <NavLinkActive
            background="#000"
            color="#000"
            top="-1rem"
            sx={{ fontSize: '1.3rem' }}
            to={`/usuario/${params.user}`}
            end={true}
          >
            Projetos
          </NavLinkActive>
          <NavLinkActive
            to={`/usuario/${params.user}/convites`}
            background="#000"
            color="#000"
            top="-1rem"
            sx={{ fontSize: '1.3rem' }}
          >
            Convites
          </NavLinkActive>
        </Box>

        <Routes>
          <Route path="/" element={<UserProjects username={params.user} />}></Route>
          <Route path="convites" element={<UserInvites />}></Route>
        </Routes>
      </Container>
    </Box>
  );
};

export default User;
