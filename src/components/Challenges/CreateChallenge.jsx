import { useState } from 'react';
import ModalComponent from '../../components/Modal';
import {
  Box,
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Input from '../../components/Form/Input';
import ButtonComponent from '../../components/Button';
import PropTypes from 'prop-types';
import useForm from '../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';
import RequestError from '../../components/Helper/RequestError';

const CreateChallenge = ({ openModal, setOpenModal, title, buttonTitle }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const titleInput = useForm(true);
  const description = useForm(true);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const mutation = useMutation({
    mutationFn: (dataChallenge) => {
      return axios.post('http://127.0.0.1:8000/api/v1/desafio', dataChallenge, config);
    },
    onSuccess: () => {
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
    },
  });

  const showImagePreview = ({ target }) => {
    setImagePreview({ raw: target.files[0] });
  };

  const createChallenge = () => {
    if (titleInput.validate() && description.validate()) {
      const formData = new FormData();
      formData.append('titulo', titleInput.value);
      formData.append('descricao', description.value);
      if (imagePreview) {
        formData.append('imagem', imagePreview.raw);
      }
      mutation.mutate(formData);
    }
  };

  return (
    <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
      >
        <Typography variant="h4" fontWeight="500">
          {title}
        </Typography>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <List
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0' }}
          >
            <ListItem sx={{ padding: '0.5rem 0' }}>
              <Input
                required={true}
                id="title-required"
                fullWidth
                label="Título"
                isError={titleInput.error.isError}
                value={titleInput.value}
                onChange={titleInput.onChange}
                onBlur={titleInput.onBlur}
                helperText={titleInput.error.message}
              />
            </ListItem>

            <ListItem sx={{ padding: '0' }}>
              <Input
                id="description-multiline"
                required
                fullWidth
                label="Descrição"
                variant="outlined"
                multiline
                minRows={5}
                isError={description.error.isError}
                value={description.value}
                onChange={description.onChange}
                onBlur={description.onBlur}
                helperText={description.error.message}
              />
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              component="label"
              variant="contained"
              disableElevation
              startIcon={<CloudUpload />}
              sx={{ alignSelf: 'start', marginTop: '0.5rem' }}
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
        </Box>

        <Box sx={{ display: 'grid' }}>
          <ButtonComponent
            sx={{ justifySelf: 'end' }}
            size="large"
            variant="outlined"
            onClick={createChallenge}
            isLoading={mutation.isLoading}
          >
            {buttonTitle}
          </ButtonComponent>
          <RequestError mutation={mutation} />
        </Box>
      </FormControl>
    </ModalComponent>
  );
};

CreateChallenge.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
};

export default CreateChallenge;
