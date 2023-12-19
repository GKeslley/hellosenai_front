import ModalComponent from '../../../components/Modal';
import { Box, Divider, ListItem, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../../../components/Button';
import Input from '../../../components/Form/Input';
import useForm from '../../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';

const ModalCreateInvite = ({
  openModal,
  setOpenModal,
  title,
  buttonTitle,
  inviteTitle,
  inviteDescription,
  inviteSlug,
  queryClient,
  setOpenSnackbar,
}) => {
  const titleInput = useForm(true);
  const description = useForm(true);
  const isSmallSmarthphone = useMediaQuery('(max-width: 600px)');

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post('http://127.0.0.1:8000/api/v1/convite', data, config);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['invites'], type: 'active' });
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.put(
        `http://127.0.0.1:8000/api/v1/convite/${inviteSlug}`,
        data,
        config,
      );
    },
    onSuccess: () => {
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
      queryClient.invalidateQueries({ queryKey: ['userInvites'], type: 'active' });
    },
  });

  const createOrUpdateInvite = () => {
    if (titleInput.validate() && description.validate()) {
      const data = {
        titulo: titleInput.value,
        descricao: description.value,
      };
      const token = localStorage.getItem('token');
      if (inviteTitle && inviteDescription) {
        mutationUpdate.mutate({ data, token });
        return null;
      }

      mutation.mutate({ data, token });
    }
  };

  const { setValue: setTitleValue } = titleInput;
  const { setValue: setDescriptionValue } = description;
  useEffect(() => {
    if (inviteTitle && inviteDescription) {
      setTitleValue(inviteTitle);
      setDescriptionValue(inviteDescription);
    }
  }, [inviteTitle, inviteDescription, setTitleValue, setDescriptionValue]);

  return (
    <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
      >
        <ListItem>
          <Typography variant="h4" fontWeight="500" fullWidth>
            {title}
          </Typography>
        </ListItem>
        <Divider />

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
            minRows={isSmallSmarthphone ? 18 : 5}
            isError={description.error.isError}
            value={description.value}
            onChange={description.onChange}
            onBlur={description.onBlur}
            helperText={description.error.message}
          />
        </ListItem>

        <ButtonComponent
          sx={{ alignSelf: 'end' }}
          size="large"
          variant="outlined"
          onClick={createOrUpdateInvite}
          isLoading={mutation.isLoading || mutationUpdate.isLoading}
        >
          {buttonTitle}
        </ButtonComponent>
      </Box>
    </ModalComponent>
  );
};

ModalCreateInvite.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  inviteTitle: PropTypes.string,
  inviteDescription: PropTypes.string,
  inviteSlug: PropTypes.string,
  queryClient: PropTypes.object,
  setOpenSnackbar: PropTypes.func,
};

export default ModalCreateInvite;
