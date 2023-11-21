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
import image from '../../assets/logo.png';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import DialogCreateProject from './DialogCreateProject';
import SelectComponent from '../../components/Form/Select';
import { Link } from 'react-router-dom';

const projects = [
  {
    autor: 'fulano',
    apelido: 'fulano435',
    nome: 'facebook',
    descricao: 'dsadasdsadsa',
    participantes: [
      {
        nome: 'fulano2',
      },
      {
        nome: 'fulano3',
      },
    ],
  },
  {
    autor: 'Guilherme',
    apelido: 'guilherme43433',
    nome: 'Sistema de Comunicação Social',
    descricao: 'gfgfgfgf',
    participantes: [
      {
        nome: 'fulano2',
      },
      {
        nome: 'fulano3',
      },
    ],
  },
  {
    autor: 'Guilherme',
    apelido: 'guilherme43433',
    nome: 'Sistema de Comunicação Social 2',
    descricao: 'gfgfgfgf',
    participantes: [
      {
        nome: 'fulano2',
      },
      {
        nome: 'fulano3',
      },
    ],
  },
];

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const isMobile = useMediaQuery('(min-width: 768px)');

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
              marginTop: !isMobile && '1.5rem',
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
          elevation={3}
          sx={{ display: 'flex', flexDirection: 'column', flexShrink: '0' }}
        >
          {projects.map(({ nome, autor, apelido }) => (
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
                <Box sx={{ display: 'flex', position: 'relative', marginTop: '1.5rem' }}>
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
                        {autor}
                      </Typography>

                      <Typography
                        className="text-gray-400"
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        @{apelido}
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
                        22h
                      </Typography>
                    </Box>

                    <Typography fontSize="1rem">{nome}</Typography>

                    <Link to="slug">
                      <Box
                        component="figure"
                        sx={{
                          height: 'min(285px, max(175px, 41vw))',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
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
      <DialogCreateProject
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Criar Projeto"
      />
    </Container>
  );
};

export default Projects;
