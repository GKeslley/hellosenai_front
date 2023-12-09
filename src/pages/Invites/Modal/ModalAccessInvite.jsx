import PropTypes from 'prop-types';
import ModalComponent from '../../../components/Modal';
import { Box, ListItem, TextField, Typography } from '@mui/material';
import ButtonComponent from '../../../components/Button';
import { useMutation } from 'react-query';
import axios from 'axios';
import useForm from '../../../hooks/useForm';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const ModalAccessInvite = ({
  openModalAccessInvite,
  setOpenModalAccessInvite,
  dataInvite,
}) => {
  const messageInvite = useForm(true)
  
  const mutation = useMutation((message) => {
    return axios.post(`http://127.0.0.1:8000/api/email/${dataInvite.slug}`, message, config);
  });

  const acceptInvite = () => {
    if (messageInvite.validate()) {
      mutation.mutate({
        mensagem: messageInvite.value
      })
    }
  }

  console.log(dataInvite);

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

        <ButtonComponent sx={{ alignSelf: 'end' }} onClick={acceptInvite} isLoading={mutation.isLoading}>Solicitar</ButtonComponent>
      </Box>
    </ModalComponent>
  );
};

ModalAccessInvite.propTypes = {
  openModalAccessInvite: PropTypes.bool,
  setOpenModalAccessInvite: PropTypes.func,
  dataInvite: PropTypes.object,
};

export default ModalAccessInvite;
