import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import User from './User';
import SenaiLogo from '../../assets/home/senai.png';
import NavLinkActive from '../../components/NavLink';
import ProfileProjects from './ProfileProjects';
import ProfileInvites from './ProfileInvites';

const Profile = () => {
  const isMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: !isMobile ? '1fr' : 'auto 1fr',
        gap: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          justifyItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          component="figure"
          sx={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            background: '#2E7BEF',
            width: '100%',
            minHeight: '6rem',
            display: 'grid',
          }}
        >
          <Box
            component="img"
            src={SenaiLogo}
            alt="Logo do Senai"
            sx={{ opacity: '0.5', width: '10rem', placeSelf: 'center' }}
          />
        </Box>
        <Box component="figure" sx={{ marginTop: '3rem', position: 'absolute' }}>
          <Avatar sx={{ width: '80px', height: '80px' }} />
        </Box>
        <Paper
          component="ul"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            padding: '0.5rem 3rem 2rem 3rem',
            height: 'max-content',
            width: '100%',
          }}
        >
          <ListItem sx={{ justifyContent: 'center', padding: '0px', marginTop: '8rem' }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>Fulano</Typography>
          </ListItem>
          <ListItem
            sx={{ justifyContent: 'center', padding: '0px', marginBottom: '1rem' }}
          >
            <Typography component="time">Criado em: 23/08/2015</Typography>
          </ListItem>
          <Divider sx={{ marginBottom: '1rem' }} />
          <ListItem
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'space-between',
              padding: '0px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '0.1rem',
              }}
            >
              <Typography fontSize="1.1rem">Projetos</Typography>
              <Typography component="span">13</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '0.1rem',
              }}
            >
              <Typography fontSize="1.1rem">Convites</Typography>
              <Typography component="span">15</Typography>
            </Box>
          </ListItem>
        </Paper>
      </Box>

      <Box component="section" sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <List
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            overflow: 'auto',
          }}
        >
          <ListItem sx={{ justifyContent: 'center', padding: '0', minWidth: '10rem' }}>
            <NavLinkActive
              to="/perfil"
              end={true}
              color="black"
              className="w-full text-center"
            >
              Minha Conta
            </NavLinkActive>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center', padding: '0', minWidth: '10rem' }}>
            <NavLinkActive to="projetos" color="black" className="w-full text-center">
              Meus Projetos
            </NavLinkActive>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center', padding: '0', minWidth: '10rem' }}>
            <NavLinkActive to="/perfil/convites" className="w-full text-center">
              Meus Convites
            </NavLinkActive>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center', padding: '0', minWidth: '10rem' }}>
            <NavLinkActive to="/perfil/configuracoes" className="w-full text-center">
              Configurações
            </NavLinkActive>
          </ListItem>
        </List>

        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="projetos" element={<ProfileProjects />}></Route>
          <Route path="convites" element={<ProfileInvites />}></Route>
        </Routes>
      </Box>
    </Container>
  );
};

export default Profile;
