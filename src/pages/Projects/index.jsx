import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ButtonComponent from '../../components/Button';
import { useState } from 'react';
import SelectComponent from '../../components/Form/Select';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import SnackbarRequest from '../../components/SnackbarRequest';
import useForm from '../../hooks/useForm';
import SearchIcon from '@mui/icons-material/Search';
import useQueryString from '../../hooks/useQueryString';
import ProjectsItem from './ProjectsItem';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const handleOpen = () => setOpenModal(true);
  const isMobile = useMediaQuery('(min-width: 768px)');
  const { search } = useLocation();
  const searchProject = useForm();
  const queryClient = useQueryClient();
  const { pages, infinite, setInfinite } = useInfiniteScroll();
  const { url, onChangeOrder, onSearch, params } = useQueryString({
    search: 'nomeProjeto[lk]',
    input: searchProject,
    baseUrl: 'http://127.0.0.1:8000/api/v1/projeto',
  });

  const mutation = useMutation({
    mutationFn: ({ formData, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post('http://127.0.0.1:8000/api/v1/projeto', formData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'], type: 'active' });
      setOpenModal(false);
      setOpenSnackbar(true);
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  useState(() => {
    if (!openModal && search.includes('desafio')) {
      const challengeQuery = search.split('=')[1];
      setChallenge(challengeQuery);
      setOpenModal(true);
    }
  }, []);

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
              marginTop: '4rem',
            }}
          >
            <Typography component="h1" variant="h3" fontWeight="800">
              Projetos
            </Typography>
            <FormControl
              sx={{ m: 0, width: '100%' }}
              variant="outlined"
              component="form"
              onSubmit={onSearch}
            >
              <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Buscar"
                size="small"
                onChange={searchProject.onChange}
                value={searchProject.value}
                fullWidth={true}
              />
            </FormControl>

            <ButtonComponent onClick={handleOpen} sx={{ maxWidth: '100%' }}>
              Criar Projeto
            </ButtonComponent>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: !isMobile ? '0rem' : '1rem',
              position: !isMobile && 'absolute',
              top: !isMobile && '0rem',
              width: !isMobile && '100%',
              left: !isMobile && '0px',
              justifyContent: !isMobile && 'center',
              background: '#fff',
            }}
          >
            <SelectComponent
              label="Ordenar por:"
              sx={{ width: '100%' }}
              variant={!isMobile ? 'filled' : 'standard'}
              onChange={onChangeOrder}
              value={params.order}
            >
              <MenuItem value="DESC">Mais Recentes</MenuItem>
              <MenuItem value="ASC">Mais Antigos</MenuItem>
            </SelectComponent>
          </Box>
        </Box>

        <Paper
          component="ul"
          elevation={1}
          sx={{ display: 'flex', flexDirection: 'column', flexShrink: '0' }}
        >
          {pages.map((page) => (
            <ProjectsItem
              key={page}
              params={params}
              url={url}
              page={page}
              infinite={infinite}
              setInfinite={setInfinite}
              queryClient={queryClient}
            />
          ))}
        </Paper>
      </Box>

      {openModal && (
        <ProjectForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Criar Projeto"
          challenge={challenge}
          mutation={mutation}
        />
      )}

      {openSnackbar && (
        <SnackbarRequest
          message={
            mutation.isSuccess
              ? mutation.data.data.message
              : mutation.error.response.data.message
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={mutation.isSuccess ? 'success' : 'error'}
        />
      )}
    </Container>
  );
};

export default Projects;
