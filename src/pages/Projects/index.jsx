import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Title from '../../components/Title';
import ButtonComponent from '../../components/Button';
import { useState } from 'react';
import ModalComponent from '../../components/Modal';
import MultiSelect from '../../components/Form/MultiSelect';
import { CloudUpload } from '@mui/icons-material';
import image from '../../assets/logo.png';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';

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
];

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Container sx={{ flex: '1' }}>
      <Box
        component="section"
        className="grid grid-cols-1 gap-8 md:grid-cols-auto-columns-2"
      >
        <Box className="flex justify-between gap-8 pr-6 items-center md:flex-col md:justify-normal">
          <Box className="flex flex-col gap-3">
            <Title>Projetos</Title>
            <ButtonComponent onClick={handleOpen}>Criar Projeto</ButtonComponent>
          </Box>
          <Box component="form">
            <TextField
              id="select-orderby"
              select
              label="Organizar por:"
              variant="filled"
              SelectProps={{
                native: true,
              }}
            >
              <option value="mais recentes">Mais Recentes</option>
              <option value="mais antigos">Mais Antigos</option>
            </TextField>
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
                      gap: '0.3rem',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '15px',
                        whiteSpace: 'nowrap',
                        gap: '0.8rem',
                      }}
                    >
                      <Typography
                        fontWeight="800"
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          marginRight: '5px',
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

                    <Box
                      component="figure"
                      sx={{ height: 'min(285px, max(175px, 41vw))' }}
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
                  </CardContent>
                </Box>
              </Card>
              <Divider variant="middle" />
            </>
          ))}
        </Paper>
      </Box>
      <ModalComponent handleClose={handleClose} openModal={openModal}>
        <FormControl sx={{ display: 'grid', gap: '1.5rem' }}>
          <Box sx={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr auto' }}>
            <Box sx={{ display: 'grid', gap: '1.5rem' }}>
              <TextField
                required
                id="outlined-required"
                label="Nome"
                sx={{ width: '100%' }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Descrição"
                multiline
                rows={4}
                sx={{ width: '100%' }}
              />
              <MultiSelect />
              <TextField
                required
                id="github-link"
                label="Github"
                placeholder="www.github.com"
                sx={{ width: '100%' }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
              <Typography variant="p" sx={{ marginBottom: '1rem' }}>
                Adicione uma imagem do seu projeto
              </Typography>
              <Button
                component="label"
                variant="contained"
                disableElevation
                startIcon={<CloudUpload />}
              >
                Imagem
                <input type="file" accept="image/*" hidden />
              </Button>
            </Box>
          </Box>

          <ButtonComponent variant="outlined" sx={{ justifySelf: 'right' }} size="large">
            Criar
          </ButtonComponent>
        </FormControl>
      </ModalComponent>
    </Container>
  );
};

export default Projects;
