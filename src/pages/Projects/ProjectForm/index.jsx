import {
  Box,
  Button,
  Divider,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SelectComponent from '../../../components/Form/Select';
import MultiSelect from '../../../components/Form/MultiSelect';
import { CloudUpload } from '@mui/icons-material';
import ButtonComponent from '../../../components/Button';
import RequestError from '../../../components/Helper/RequestError';
import ModalComponent from '../../../components/Modal';
import useForm from '../../../hooks/useForm';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchParticipants = async (username) => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/v1/usuario?user=${username}`)
    .then((response) => response.data);
  return response.data;
};

const ProjectForm = ({
  project,
  setOpenModal,
  openModal,
  mutation,
  title,
  challenge,
}) => {
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

  const createOrUpdateProject = () => {
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

      if (participants.length) {
        formData.append('participantes', JSON.stringify(participants));
      }

      if (challenge) {
        formData.append('desafio', challenge);
      }

      mutation.mutate(formData);
    }
  };

  if (project && !status.value) {
    name.setValue(project.name);
    description.setValue(project.description);
    status.setValue(project.status.toLowerCase());
    setParticipants(() => {
      const values = project.participants.map(({ apelido }) => {
        return apelido;
      });
      return values;
    });
    setImagePreview({
      raw: { name: `http://127.0.0.1:8000${project.image}` },
    });
  }

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
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <Typography variant="h4" fontWeight="500">
            {title}
          </Typography>
          {challenge && <Typography>Desafio: {challenge}</Typography>}
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
              required={true}
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
              required={true}
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
              defaultValue={participants}
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
              <Box
                component="span"
                sx={{ marginTop: '0.5rem', fontSize: '0.8rem', wordWrap: 'break-word' }}
              >
                {imagePreview.raw.name}
              </Box>
            )}
          </Box>
        </ListItem>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <ButtonComponent
            variant="outlined"
            sx={{ alignSelf: 'end' }}
            size="large"
            onClick={createOrUpdateProject}
            isLoading={mutation.isLoading}
          >
            {project ? 'Atualizar' : 'Criar'}
          </ButtonComponent>
          {mutation.error && <RequestError mutation={mutation} />}
        </Box>
      </Box>
    </ModalComponent>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.object,
  setOpenModal: PropTypes.func,
  openModal: PropTypes.bool,
  mutation: PropTypes.object,
  title: PropTypes.string,
  challenge: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProjectForm;
