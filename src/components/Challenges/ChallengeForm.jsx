import { useEffect, useState } from 'react';
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
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';
import RequestError from '../../components/Helper/RequestError';

const ChallengeForm = ({
  openDialog,
  setOpenDialog,
  title,
  buttonTitle,
  setOpenSnackbar,
  challengeData,
}) => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const titleInput = useForm(true);
  const description = useForm(true);

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post('http://127.0.0.1:8000/api/v1/desafio', data, config);
    },
    onSuccess: ({ data }) => {
      titleInput.setValue('');
      description.setValue('');
      setOpenDialog(false);
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
      queryClient.invalidateQueries({ queryKey: ['challengesTeacher'], type: 'active' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const mutationUpdateChallenge = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(
        `http://127.0.0.1:8000/api/v1/desafio/${challengeData.slug}?_method=PUT`,
        data,
        config,
      );
    },
    onSuccess: ({ data }) => {
      setOpenDialog(false);
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
      queryClient.invalidateQueries({ queryKey: ['challengesTeacher'], type: 'active' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const showImagePreview = ({ target }) => {
    setImagePreview({ raw: target.files[0] });
  };

  const createOrUpdateChallenge = () => {
    if (titleInput.validate() && description.validate()) {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('titulo', titleInput.value);
      formData.append('descricao', description.value);
      if (imagePreview) {
        formData.append('imagem', imagePreview.raw);
      }
      if (challengeData) {
        mutationUpdateChallenge.mutate({ data: formData, token });
        return null;
      }

      mutation.mutate({ data: formData, token });
    }
  };

  const { setValue: titleValue } = titleInput;
  const { setValue: descriptionValue } = description;
  useEffect(() => {
    if (challengeData) {
      titleValue(challengeData.title);
      descriptionValue(challengeData.description);
    }
  }, [titleValue, descriptionValue, challengeData]);

  return (
    <ModalComponent openModal={openDialog} setOpenModal={setOpenDialog}>
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
            onClick={createOrUpdateChallenge}
            isLoading={mutation.isLoading || mutationUpdateChallenge.isLoading}
          >
            {buttonTitle}
          </ButtonComponent>
          <RequestError mutation={mutation} />
        </Box>
      </FormControl>
    </ModalComponent>
  );
};

ChallengeForm.propTypes = {
  openDialog: PropTypes.bool,
  setOpenDialog: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  setOpenSnackbar: PropTypes.func,
  challengeData: PropTypes.object,
};

export default ChallengeForm;
