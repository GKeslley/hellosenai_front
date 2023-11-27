import ModalComponent from '../../../components/Modal';
import {
  Box,
  Button,
  Divider,
  ListItem,
  TextField,
  Typography,
  Container,
  MenuItem,
} from '@mui/material';
import MultiSelect from '../../../components/Form/MultiSelect';
import { CloudUpload } from '@mui/icons-material';
import ButtonComponent from '../../../components/Button';
import PropTypes from 'prop-types';
import useForm from '../../../hooks/useForm';
import SelectComponent from '../../../components/Form/Select';
import { useState } from 'react';

const DialogCreateProject = ({ openModal, setOpenModal, title }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [participants, setParticipants] = useState({ participants: [] });
  const name = useForm(true);
  const description = useForm(true);
  const github = useForm(true);

  const participantsForTheProject = (event, values) => {
    setParticipants({ participants: values });
  };

  const showImagePreview = ({ target }) => {
    setImagePreview({ raw: target.files[0] });
  };

  const createProject = () => {
    console.log(imagePreview.raw);
  };

  console.log(imagePreview);

  return (
    <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ListItem>
          <Typography variant="h4" fontWeight="500" fullWidth>
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
              error={name.error}
              value={name.value}
              onChange={name.onChange}
              onBlur={name.onBlur}
              helperText={name.error}
            />
            <TextField
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              sx={{ width: '100%' }}
              error={description.error}
              value={description.value}
              onChange={description.onChange}
              onBlur={description.onBlur}
              helperText={description.error}
            />

            <SelectComponent label="Status" variant="outlined" size="large" value="">
              <MenuItem value="construindo">Construindo</MenuItem>
              <MenuItem value="concluido">Concluido</MenuItem>
            </SelectComponent>

            <MultiSelect
              label="Participantes"
              placeholder="Participante"
              onChange={participantsForTheProject}
            />

            <TextField
              required
              id="github-link"
              label="Github"
              placeholder="www.github.com"
              sx={{ width: '100%' }}
              error={github.error}
              value={github.value}
              onChange={github.onChange}
              onBlur={github.onBlur}
              helperText={github.error}
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
      </Container>
    </ModalComponent>
  );
};

DialogCreateProject.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
};

export default DialogCreateProject;
