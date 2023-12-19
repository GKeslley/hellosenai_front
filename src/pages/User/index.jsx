import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import thumb from '../../assets/senai-user.jpg';
import NavLinkActive from '../../components/NavLink';
import { Route, Routes, useParams } from 'react-router-dom';
import UserProjects from './UserProjects';
import UserInvites from './UserInvites';
import { useQuery } from 'react-query';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Loading from '../../components/Helper/Loading';
import Subtitle from '../../components/Subtitle';
import AvatarUser from '../../components/Avatar';
import Error from '../Error';

const User = () => {
  const params = useParams();

  const { data, isLoading, error } = useQuery('userData', () => {
    return axios
      .get(`http://127.0.0.1:8000/api/v1/usuario/${params.user}`)
      .then((response) => response.data);
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error message={error.response.data.message} statusCode={error.response.status} />
    );
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
            {data.status === 'inativo' ? (
              <Avatar sx={{ width: '150px', height: '150px' }} />
            ) : (
              <AvatarUser avatar={data.avatar} sx={{ width: '150px', height: '150px' }} />
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.1rem',
                marginBottom: '1rem',
              }}
            >
              <Typography fontWeight={800} fontSize="2rem">
                {data.nome}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CalendarMonthIcon sx={{ width: '20px', height: '20px' }} />
                <Typography>Ingressou em: {data.criadoEm}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        sx={{ display: 'grid', gap: '0.5rem', marginTop: '180px', marginBottom: '10rem' }}
      >
        {data && (
          <>
            {data.status === 'ativo' ? (
              <>
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
                  <Route
                    path="/"
                    element={<UserProjects username={params.user} />}
                  ></Route>
                  <Route
                    path="convites"
                    element={<UserInvites username={params.user} />}
                  ></Route>
                  <Route
                    path="*"
                    element={<Error message="Página não encontrada" statusCode="400" />}
                  ></Route>
                </Routes>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifySelf: 'center',
                  textAlign: 'center',
                }}
              >
                <Subtitle sx={{ marginBottom: '0' }}>Conta Desativada</Subtitle>
                <Typography>O usuário desativou a conta</Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default User;
