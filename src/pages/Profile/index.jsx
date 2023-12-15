import {
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
import { useContext, useState } from 'react';
import { UserGlobalContext } from '../../contexts/UserContext';
import Loading from '../../components/Helper/Loading';
import Settings from './Settings';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import SnackbarRequest from '../../components/SnackbarRequest';
import AvatarUser from '../../components/Avatar';

const Profile = () => {
  const isMobile = useMediaQuery('(min-width: 768px)');
  const queryClient = useQueryClient();
  const { data, isLoading } = useContext(UserGlobalContext);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.post(`http://127.0.0.1:8000/api/v1/avatar?_method=PUT`, data, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'], type: 'active' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const changeAvatar = ({ target }) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', target.files[0]);
    mutation.mutate({ data: formData, token });
  };

  console.log(data);

  if (isLoading) return <Loading />;
  return (
    <Container
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: !isMobile ? '1fr' : 'auto 1fr',
        gap: '2rem',
        marginBottom: '2rem',
        marginTop: '2rem',
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
        <Box
          component="figure"
          sx={{
            marginTop: '3rem',
            position: 'absolute',
            cursor: 'pointer',
            ':hover': {
              '.MuiTypography-root': {
                display: 'block',
              },
              '.MuiAvatar-root': {
                opacity: '0.9',
              },
            },
          }}
        >
          <Box component="label" sx={{ position: 'relative', cursor: 'pointer' }}>
            <AvatarUser avatar={data.avatar} sx={{ width: '90px', height: '90px' }} />
            {!mutation.isLoading && (
              <input type="file" accept="image/*" hidden onChange={changeAvatar} />
            )}
          </Box>
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
          <ListItem
            sx={{ justifyContent: 'center', padding: '0px', marginTop: '8.5rem' }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
              {data.nome}
            </Typography>
          </ListItem>
          <ListItem
            sx={{ justifyContent: 'center', padding: '0px', marginBottom: '1rem' }}
          >
            <Typography component="time">Criado em: {data.dataCriacao}</Typography>
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
              color="#000"
              background="#000"
              sx={{ width: '100%', textAlign: 'center' }}
            >
              Minha Conta
            </NavLinkActive>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center', padding: '0', minWidth: '10rem' }}>
            <NavLinkActive
              to="/perfil/configuracoes"
              color="#000"
              background="#000"
              sx={{ width: '100%', textAlign: 'center' }}
            >
              Configurações
            </NavLinkActive>
          </ListItem>
        </List>

        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="configuracoes" element={<Settings />}></Route>
        </Routes>
      </Box>

      {openSnackbar.open && (
        <SnackbarRequest
          message={openSnackbar.message}
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={openSnackbar.severity}
        />
      )}
    </Container>
  );
};

export default Profile;
