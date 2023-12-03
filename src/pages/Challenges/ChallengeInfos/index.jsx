import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Title from '../../../components/Title';
import Sidebar from '../Sidebar';
import ButtonComponent from '../../../components/Button';
import NavLinkActive from '../../../components/NavLink';
import CreateChallenge from './CreateChallenge';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../../../components/Helper/Loading';

const fetchChallengesByTeacher = async (username) => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/v1/desafios/${username}`)
    .then((response) => response.data);
  return response.data;
};

const ChallengeInfos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const params = useParams();

  const { data, isLoading, error } = useQuery(
    'challengesTeacher',
    () => fetchChallengesByTeacher(params.user),
    {
      refetchOnWindowFocus: false,
    },
  );

  console.log(data);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isLoading) return <Loading />;
  if (error) return null;
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        flexGrow: '1',
      }}
    >
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ marginBottom: '2rem' }}>
        <Paper sx={{ borderRadius: '0', marginBottom: '2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
            <NavLinkActive
              to={`/desafios/${params.user}`}
              background="#000"
              color="inherit"
              sx={{ padding: '1rem 2rem' }}
              after={{ bottom: '0', left: '0' }}
            >
              Desafios
            </NavLinkActive>
            <NavLinkActive
              to="/desafios/leo/realizados"
              background="#000"
              color="inherit"
              sx={{ padding: '1rem 2rem' }}
              after={{ bottom: '0', left: '0' }}
            >
              Desafios Realizados
            </NavLinkActive>
          </Box>
        </Paper>

        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Box
            sx={{
              display: 'grid',
              background: '#2563eb',
              height: '15rem',
              borderRadius: '6px',
            }}
          >
            <Box sx={{ alignSelf: 'end', color: '#fff', padding: '1rem 2rem' }}>
              <Title sx={{ color: '#fff' }}>Desafios</Title>
              <Typography marginLeft="2px">Leonardo Lucena</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                alignItems: 'center',
              }}
              elevation={1}
            >
              <Typography>Poste um novo desafio!</Typography>
              <ButtonComponent size="small" onClick={() => setOpenModal(true)}>
                Criar Desafio
              </ButtonComponent>
            </Paper>

            {data &&
              data.map(({ desafio: { titulo, descricao, dataCriacao, slug, autor } }) => (
                <>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                      border: '0.0625rem solid #dadce0',
                    }}
                    elevation={0}
                    key={titulo}
                  >
                    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <Avatar />
                      <Box>
                        <Typography fontSize="0.875rem">{autor.nome}</Typography>
                        <Typography
                          component="time"
                          fontSize="0.75rem"
                          color="rgb(169, 162, 151)"
                        >
                          {dataCriacao}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <Typography fontWeight="800">{titulo}</Typography>
                      <Typography sx={{ whiteSpace: 'pre-line' }}>{descricao}</Typography>
                      <ButtonComponent
                        sx={{ alignSelf: 'end' }}
                        component={Link}
                        to={`/projetos?desafio=${slug}`}
                      >
                        Realizar
                      </ButtonComponent>
                    </Box>
                  </Paper>
                </>
              ))}
          </Box>

          <CreateChallenge
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Criar Desafio"
            buttonTitle="Criar"
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ChallengeInfos;
