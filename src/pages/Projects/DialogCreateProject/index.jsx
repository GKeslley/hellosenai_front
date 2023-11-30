import ModalComponent from '../../../components/Modal';
import {
  Box,
  Button,
  Divider,
  ListItem,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import MultiSelect from '../../../components/Form/MultiSelect';
import { CloudUpload } from '@mui/icons-material';
import ButtonComponent from '../../../components/Button';
import PropTypes from 'prop-types';
import useForm from '../../../hooks/useForm';
import SelectComponent from '../../../components/Form/Select';
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { Snackbar } from '@mui/base';

const fetchParticipants = async (username) => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/v1/usuario?user=${username}`)
    .then((response) => response.data);
  return response.data;
};

const DialogCreateProject = ({ openModal, setOpenModal, title }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [newUserValue, setNewUserValue] = useState('');
  const [participants, setParticipants] = useState([]);
  const name = useForm(true);
  const description = useForm(true);
  const status = useForm(true);
  const github = useForm(true);
  const [value] = useDebounce(newUserValue, 400);

  let { data, isLoading } = useQuery(
    ['participants', value],
    () => fetchParticipants(value),
    {
      refetchOnWindowFocus: false,
    },
  );

  const participantsForTheProject = (event, values) => {
    setParticipants(values);
  };

  const showImagePreview = ({ target }) => {
    setImagePreview({ raw: target.files[0] });
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const mutation = useMutation((dataProject) => {
    return axios.post('http://127.0.0.1:8000/api/v1/projeto', dataProject, config);
  });

  const createProject = () => {
    if (
      name.validate() &&
      description.validate() &&
      status.validate() &&
      github.validate() &&
      imagePreview
    ) {
      const formData = new FormData();
      formData.append('nomeProjeto', name.value);
      formData.append('descricao', description.value);
      formData.append('status', status.value);
      formData.append('link', github.value);
      formData.append('imagem', imagePreview.raw);
      formData.append(
        'participantes',
        participants.length ? JSON.stringify(participants) : null,
      );
      mutation.mutate(formData);
    }
  };

  console.log(status.error);

  if (data) {
    data = data.map(({ apelido }) => apelido);
  }

  return (
    <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
      >
        <ListItem>
          <Typography variant="h4" fontWeight="500">
            {title}
          </Typography>
        </ListItem>

        <Divider />

        <ListItem sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <Box sx={{ display: 'grid', gap: '1.5rem', flexGrow: '1' }}>
            <TextField
              required
              id="outlined-required"
              label="Nome"
              sx={{ width: '100%' }}
              error={name.error.isError}
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              helperText={name.error.message}
            />
            <TextField
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              sx={{ width: '100%' }}
              error={description.error.isError}
              value={description.value}
              onChange={description.onChange}
              onBlur={description.onBlur}
              helperText={description.error.message}
            />

            <SelectComponent
              label="Status"
              variant="outlined"
              size="large"
              value={status.value}
              onChange={status.onChange}
              error={status.error.isError}
              onBlur={status.onBlur}
              helperText={status.error.message}
            >
              <MenuItem value="construindo">Construindo</MenuItem>
              <MenuItem value="concluido">Concluido</MenuItem>
            </SelectComponent>

            <MultiSelect
              label="Participantes"
              placeholder="Participante"
              onChange={participantsForTheProject}
              onInputChange={(event, value) => setNewUserValue(value)}
              isLoading={isLoading}
              options={data}
            />

            <TextField
              required
              id="github-link"
              label="Github"
              placeholder="www.github.com"
              sx={{ width: '100%' }}
              error={github.error.isError}
              value={github.value}
              onChange={github.onChange}
              onBlur={github.onBlur}
              helperText={github.error.message}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '1rem',
              alignSelf: 'start',
              flexGrow: '1',
              flexBasis: '0',
              minWidth: '20rem',
            }}
          >
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
              <input type="file" accept="image/*" hidden onChange={showImagePreview} />
            </Button>

            {imagePreview && (
              <Box component="span" sx={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                {imagePreview.raw.name}
              </Box>
            )}
          </Box>
        </ListItem>

        <ButtonComponent
          variant="outlined"
          sx={{ alignSelf: 'end' }}
          size="large"
          onClick={createProject}
        >
          Criar
        </ButtonComponent>

        <Snackbar
          open={mutation.isSuccess}
          autoHideDuration={6000}
          message="Projeto Criado"
        />
      </Box>
    </ModalComponent>
  );
};

DialogCreateProject.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
};

export default DialogCreateProject;
