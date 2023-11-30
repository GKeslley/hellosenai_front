import ModalComponent from '../../../components/Modal';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../../../components/Button';
import Input from '../../../components/Form/Input';
import useForm from '../../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';

const ModalCreateInvite = ({ openModal, setOpenModal, title, buttonTitle }) => {
  const titleInput = useForm(true);
  const description = useForm(true);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const mutation = useMutation({
    mutationFn: (dataInvite) => {
      return axios.post('http://127.0.0.1:8000/api/v1/convite', dataInvite, config);
    },
    onSuccess: () => {
      titleInput.setValue('');
      description.setValue('');
      setOpenModal(false);
    },
  });

  const createInvite = () => {
    if (titleInput.validate() && description.validate()) {
      mutation.mutate({
        titulo: titleInput.value,
        descricao: description.value,
      });
    }
  };

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
          onClick={createInvite}
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
};

export default ModalCreateInvite;
