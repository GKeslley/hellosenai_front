import { Box, Container, FormControl } from '@mui/material';
import Title from '../../../components/Title';
import Input from '../../../components/Form/Input';
import useForm from '../../../hooks/useForm';
import ButtonComponent from '../../../components/Button';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import SnackbarRequest from '../../../components/SnackbarRequest';
import { UserGlobalContext } from '../../../contexts/UserContext';
import Loading from '../../../components/Helper/Loading';
import Error from '../../Error';

const RegisterAdm = () => {
  const { data, isLoading } = useContext(UserGlobalContext);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const name = useForm(true);
  const email = useForm('email');
  const password = useForm('password');

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post('http://127.0.0.1:8000/api/v1/adm', data, config);
    },
    onSuccess: ({ data }) => {
      name.setValue('');
      email.setValue('');
      password.setValue('');
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

  const sendMessage = () => {
    if (name.validate() && email.validate()) {
      const data = {
        nome: name.value,
        email: email.value,
        senha: password.value,
      };
      const token = localStorage.getItem('token');
      mutation.mutate({ data, token });
    }
  };

  if (isLoading) return <Loading />;
  if (data && data.permissao !== 'adm')
    return <Error message="Autorização negada" statusCode="401" />;
  return (
    <Box sx={{ flexGrow: '1', position: 'relative' }}>
      <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Title sx={{ marginBottom: '2rem' }}>Novo Administrador</Title>
        <FormControl
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <Input
            error={name.error.isError}
            required={true}
            id="name"
            fullWidth={true}
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            helperText={name.error.isError && name.error.message}
            label="Nome"
            variant="standard"
          />
          <Input
            error={email.error.isError}
            required={true}
            id="email"
            fullWidth={true}
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            helperText={email.error.isError && email.error.message}
            label="Email"
            variant="standard"
          />
          <Input
            error={password.error.isError}
            required={true}
            id="password"
            fullWidth={true}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            helperText={password.error.isError && password.error.message}
            label="Senha"
            variant="standard"
            type="password"
          />
          <ButtonComponent
            onClick={sendMessage}
            sx={{ marginBottom: '1rem' }}
            isLoading={mutation.isLoading}
          >
            Enviar
          </ButtonComponent>
        </FormControl>
        {openSnackbar.open && (
          <SnackbarRequest
            message={openSnackbar.message}
            open={openSnackbar.open}
            onClose={() => setOpenSnackbar({ open: false, message: '', severity: '' })}
            severity={openSnackbar.severity}
          />
        )}
      </Container>
    </Box>
  );
};

export default RegisterAdm;
