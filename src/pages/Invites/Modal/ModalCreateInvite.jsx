import ModalComponent from '../../../components/Modal';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../../../components/Button';
import Input from '../../../components/Form/Input';
import useForm from '../../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const ModalCreateInvite = ({
  openModal,
  setOpenModal,
  title,
  buttonTitle,
  inviteTitle,
  inviteDescription,
  inviteSlug,
  queryClient,
}) => {
  const titleInput = useForm(true);
  const description = useForm(true);

  const mutation = useMutation({
    mutationFn: (dataInvite) => {
      return axios.post('http://127.0.0.1:8000/api/v1/convite', dataInvite, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'], type: 'active' });
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (dataInvite) => {
      return axios.put(
        `http://127.0.0.1:8000/api/v1/convite/${inviteSlug}`,
        dataInvite,
        config,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInvites'], type: 'active' });
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
    },
  });

  const createOrUpdateInvite = () => {
    if (titleInput.validate() && description.validate()) {
      if (inviteTitle && inviteDescription) {
        mutationUpdate.mutate({
          titulo: titleInput.value,
          descricao: description.value,
        });
        return null;
      }

      mutation.mutate({
        titulo: titleInput.value,
        descricao: description.value,
      });
    }
  };

  const { setValue: setTitleValue } = titleInput;
  const { setValue: setDescriptionValue } = description;
  useEffect(() => {
    console.log('dsadsadsa');
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
            minRows={5}
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
          isLoading={mutation.isLoading}
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
};

export default ModalCreateInvite;
