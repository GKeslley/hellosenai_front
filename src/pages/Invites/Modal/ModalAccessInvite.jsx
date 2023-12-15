import PropTypes from 'prop-types';
import ModalComponent from '../../../components/Modal';
import { Box, ListItem, TextField, Typography } from '@mui/material';
import ButtonComponent from '../../../components/Button';
import { useMutation } from 'react-query';
import axios from 'axios';
import useForm from '../../../hooks/useForm';

const ModalAccessInvite = ({
  openModalAccessInvite,
  setOpenModalAccessInvite,
  dataInvite,
  setOpenSnackbar,
}) => {
  const messageInvite = useForm(true);

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      return axios.post(
        `http://127.0.0.1:8000/api/email/${dataInvite.slug}`,
        data,
        config,
      );
    },
    onSuccess: (data) => {
      setOpenModalAccessInvite(false);
      setOpenSnackbar({ open: true, message: data.data.message, severity: 'success' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const acceptInvite = () => {
    if (messageInvite.validate()) {
      const data = {
        mensagem: messageInvite.value,
      };
      const token = localStorage.getItem('token');
      mutation.mutate({ data, token });
    }
  };

  return (
    <ModalComponent
      openModal={openModalAccessInvite}
      setOpenModal={setOpenModalAccessInvite}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
      >
        <ListItem
          sx={{ flexDirection: 'column', alignItems: 'start', maxWidth: 'max-content' }}
        >
          <Typography variant="h4" fontWeight="500">
            {dataInvite.titulo}
          </Typography>
          <Typography color="text.secondary" fontSize="0.9rem">
            Autor: @{dataInvite.autor.nome}
          </Typography>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Descrição
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{dataInvite.descricao}</Typography>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Deseja Participar?
          </Typography>
          <TextField
            id="description-multiline"
            fullWidth
            label="Mensagem"
            placeholder="Desejo participar do projeto..."
            multiline
            minRows={5}
            variant="outlined"
            helperText="Um email será enviado ao autor do convite com sua mensagem"
            value={messageInvite.value}
            onChange={messageInvite.onChange}
          />
        </ListItem>

        <ButtonComponent
          sx={{ alignSelf: 'end' }}
          onClick={acceptInvite}
          isLoading={mutation.isLoading}
        >
          Solicitar
        </ButtonComponent>
      </Box>
    </ModalComponent>
  );
};

ModalAccessInvite.propTypes = {
  openModalAccessInvite: PropTypes.bool,
  setOpenModalAccessInvite: PropTypes.func,
  dataInvite: PropTypes.object,
  setOpenSnackbar: PropTypes.func,
};

export default ModalAccessInvite;
