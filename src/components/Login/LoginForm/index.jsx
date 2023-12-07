import { Box, Divider, FormControl, Typography } from '@mui/material';
import Input from '../../Form/Input';
import Title from '../../Title';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ButtonComponent from '../../Button';
import LinkComponent from '../../Link';
import useForm from '../../../hooks/useForm';
import axios from 'axios';
import { useMutation } from 'react-query';
import RequestError from '../../Helper/RequestError';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm('password');

  const mutation = useMutation((dataLoginUser) => {
    return axios.post('http://127.0.0.1:8000/api/auth/login', dataLoginUser);
  });

  const userLogin = () => {
    if (email.validate() && password.validate()) {
      mutation.mutate({
        email: email.value,
        senha: password.value,
      });
    }
  };

  if (mutation.isSuccess) {
    localStorage.setItem('token', mutation.data.data.plainTextToken);
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Title sx={{ marginBottom: '1.5rem' }}>Log In</Title>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon
            sx={{ color: 'action.active', my: 0.5, position: 'absolute', zIndex: '10' }}
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
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <LockIcon
            sx={{ color: 'action.active', my: 0.5, position: 'absolute', zIndex: '10' }}
          />
          <Input
            error={password.error.isError}
            required={true}
            id="senha"
            fullWidth={true}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            helperText={email.error.isError && email.error.message}
            label="Senha"
            variant="standard"
            type="password"
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        <ButtonComponent size="large" onClick={userLogin} isLoading={mutation.isLoading}>
          Log In
        </ButtonComponent>
        <RequestError mutation={mutation} />
      </FormControl>

      <Divider variant="inset" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '1.5rem',
          width: 'max-content',
        }}
      >
        <Typography>Não tem uma conta?</Typography>
        <LinkComponent to="registro" decoration="underline" animation={false}>
          Registre-se
        </LinkComponent>
      </Box>
    </Box>
  );
};

export default LoginForm;
