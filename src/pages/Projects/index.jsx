import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ButtonComponent from '../../components/Button';
import { useState } from 'react';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import DialogCreateProject from './DialogCreateProject';
import SelectComponent from '../../components/Form/Select';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import Options from '../../components/Options';

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [slugProject, setSlugProject] = useState(null);
  const handleOpen = () => setOpenModal(true);
  const isMobile = useMediaQuery('(min-width: 768px)');
  const { search } = useLocation();

  const { data, isLoading } = useQuery('projects', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/projeto')
      .then((response) => response.data);
  });

  const getSlugProject = (slugProject) => {
    setSlugProject(slugProject);
  };

  useState(() => {
    if (!openModal && search.includes('desafio')) {
      const challengeQuery = search.split('=')[1];
      setChallenge(challengeQuery);
      setOpenModal(true);
    }
  }, []);

  console.log(data);

  if (isLoading) return <Loading />;
  return (
    <Container sx={{ flex: '1', position: 'relative' }}>
      <Box
        component="section"
        className="grid grid-cols-1 gap-8 md:grid-cols-auto-columns-2"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '1.5rem',
            gap: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <Typography component="h1" variant="h3" fontWeight="800">
              Projetos
            </Typography>
            <ButtonComponent onClick={handleOpen}>Criar Projeto</ButtonComponent>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: !isMobile ? '0rem' : '1rem',
              position: !isMobile && 'absolute',
              top: !isMobile && '-2rem',
              width: !isMobile && '100%',
              left: !isMobile && '0px',
              justifyContent: !isMobile && 'center',
              background: '#fff',
            }}
          >
            <SelectComponent
              label="Ordenar por:"
              sx={{ width: '100%' }}
              variant={!isMobile ? 'outlined' : 'standard'}
            >
              <MenuItem value="recentes">Mais Recentes</MenuItem>
              <MenuItem value="antigos">Mais Antigos</MenuItem>
            </SelectComponent>
            <SelectComponent
              label="Tag:"
              sx={{ width: '100%' }}
              variant={!isMobile ? 'outlined' : 'standard'}
            >
              <MenuItem value="game">Game</MenuItem>
              <MenuItem value="web">Web</MenuItem>
              <MenuItem value="desktop">Desktop</MenuItem>
            </SelectComponent>
          </Box>
        </Box>

        <Paper
          component="ul"
          elevation={1}
          sx={{ display: 'flex', flexDirection: 'column', flexShrink: '0' }}
        >
          {data &&
            data.data.map(({ nomeProjeto, dataCriacao, slug, imagem, autor }) => (
              <>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '14px 16px',
                    maxWidth: '100%',
                  }}
                  elevation={0}
                  component="li"
                >
                  <Box
                    sx={{ display: 'flex', position: 'relative', marginTop: '1.5rem' }}
                  >
                    <Avatar
                      sx={{
                        width: '50px',
                        height: '50px',
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                      }}
                    />

                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '0 0 0 59px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '15px',
                          whiteSpace: 'nowrap',
                          gap: '0.4rem',
                        }}
                      >
                        <Typography
                          fontWeight="800"
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            marginRight: '5px',
                            marginTop: '0.125rem',
                          }}
                        >
                          {autor.nome}
                        </Typography>

                        <Typography
                          className="text-gray-400"
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                        >
                          @{autor.apelido}
                        </Typography>

                        <Typography
                          component="span"
                          fontSize="0.5rem"
                          className="bg-gray-400 h-1 w-1 rounded-full mx-2"
                        ></Typography>

                        <Typography
                          component="time"
                          fontSize="0.9rem"
                          className="text-gray-400"
                        >
                          {dataCriacao}
                        </Typography>

                        <Options
                          sx={{ flexGrow: '1', textAlign: 'end' }}
                          slugProject={slugProject}
                          getSlugProject={() => getSlugProject(slug)}
                          setSlugProject={setSlugProject}
                        />
                      </Box>

                      <Typography fontSize="1rem">{nomeProjeto}</Typography>

                      <Link to={`/projetos/${slug}`}>
                        <Box
                          component="figure"
                          sx={{
                            height: 'min(285px, max(175px, 41vw))',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <Box
                            component="img"
                            src={`http://127.0.0.1:8000${imagem}`}
                            alt="teste"
                            sx={{
                              borderRadius: '6px',
                              height: '100%',
                              objectFit: 'cover',
                              width: '100%',
                            }}
                          />
                        </Box>

                        <Box className="flex items-center justify-between gap-5">
                          <Chip icon={<ChatBubbleRoundedIcon />} label="5" />
                        </Box>
                      </Link>
                    </CardContent>
                  </Box>
                </Card>
                <Divider variant="middle" />
              </>
            ))}
        </Paper>
      </Box>

      {openModal && (
        <DialogCreateProject
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Criar Projeto"
          challenge={challenge}
        />
      )}
    </Container>
  );
};

export default Projects;
