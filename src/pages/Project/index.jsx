import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
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
  }
];

const Project = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Container sx={{ flex: '1' }}>
      <Box
        component="section"
        sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem' }}
      >
        <Box className="flex flex-col gap-8 pr-6">
          <Title>Projetos</Title>
          <ButtonComponent onClick={handleOpen}>Criar Projeto</ButtonComponent>
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

        <Box component="ul" className="flex flex-col gap-5">
          {projects.map(({ nome, autor, apelido }) => (
            <Box key={nome} component="li">
              <Card sx={{ minWidth: 275 }} className="grid gap-5 max-w-full p-5" elevation={0}>

                <CardContent className="grid grid-rows-auto" sx={{ padding: '0' }}>

                  <Box className="flex items-start gap-x-4 mb-6">
                    <Avatar sx={{width: '50px', height: '50px'}} />
                    <Box className='flex flex-col gap-1'>
                      <Box className='flex gap-3 items-center'>
                        <Typography fontSize="1.3rem" fontWeight='800'>{autor}</Typography>
                        <Typography fontSize="0.9rem" className="text-gray-400">@{apelido}</Typography>
                      </Box>
                      <Typography fontSize="1rem">{nome}</Typography>
                    </Box>
                  </Box>

                  <Box component='figure' sx={{padding: '0 calc(50px + 1rem)'}}>
                    <Box component='img' src={image} alt="teste" sx={{borderRadius: '6px'}} />
                  </Box>

                </CardContent>

                <ButtonComponent sx={{ justifySelf: 'right' }}>
                  Informações
                </ButtonComponent>
              </Card>
            </Box>
          ))}
        </Box>
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

export default Project;
