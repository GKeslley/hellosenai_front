import { Box, Container, ListItem, Typography } from '@mui/material';
import ButtonComponent from '../../../components/Button';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import ModalComponent from '../../../components/Modal';
import Input from '../../../components/Form/Input';
import useForm from '../../../hooks/useForm';
import SnackbarRequest from '../../../components/SnackbarRequest';
import DisableAccount from '../../../components/Settings/DisableAccount';

const Settings = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const password = useForm('password');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const mutation = useMutation({
    mutationFn: (newPassword) => {
      return axios.put(
        'http://127.0.0.1:8000/api/v1/usuario/senha/modificar',
        newPassword,
        config,
      );
    },
    onSuccess: () => {
      password.setValue('');
      setOpenDialog(false);
      setOpenSnackbar(true);
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const changePassword = () => {
    if (password.validate()) {
      mutation.mutate({
        senha: password.value,
      });
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography>Modificar Senha</Typography>
        <ButtonComponent size="md" onClick={() => setOpenDialog(true)}>
          Modificar
        </ButtonComponent>
      </Box>

      <DisableAccount />

      {openDialog && (
        <ModalComponent setOpenModal={setOpenDialog} openModal={openDialog}>
          <ListItem
            sx={{
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Typography fontSize="1.5rem">Nova Senha</Typography>
            <Input
              required={true}
              fullWidth={true}
              label="Senha"
              isError={password.error.isError}
              onChange={password.onChange}
              value={password.value}
              onBlur={password.onBlur}
              helperText={password.error.isError && password.error.message}
              type="password"
            />
            <ButtonComponent
              sx={{ alignSelf: 'end' }}
              onClick={changePassword}
              isLoading={mutation.isLoading}
            >
              Confirmar
            </ButtonComponent>
          </ListItem>
        </ModalComponent>
      )}
      {openSnackbar && (
        <SnackbarRequest
          message={
            mutation.isSuccess
              ? mutation.data.data.message
              : mutation.error.response.data.message
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={mutation.isSuccess ? 'success' : 'error'}
        />
      )}
    </Container>
  );
};

export default Settings;
