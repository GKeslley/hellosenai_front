import { Box, Divider, FormControl, Typography } from '@mui/material';
import Input from '../../Form/Input';
import Title from '../../Title';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ButtonComponent from '../../Button';
import LinkComponent from '../../Link';
import PersonIcon from '@mui/icons-material/Person';
import useForm from '../../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Navigate } from 'react-router';
import RequestError from '../../Helper/RequestError';

const RegisterForm = () => {
  const name = useForm(true);
  const email = useForm('email');
  const password = useForm('password');

  const mutation = useMutation((newUser) => {
    return axios.post('http://127.0.0.1:8000/api/v1/usuario', newUser);
  });

  const registerUser = async () => {
    if (name.validate() && email.validate() && password.validate()) {
      mutation.mutate({
        nome: name.value,
        email: email.value,
        senha: password.value,
      });
    }
  };

  if (mutation.isSuccess) return <Navigate to="/" />;
  return (
    <Box sx={{ position: 'relative' }}>
      <Title sx={{ marginBottom: '1.5rem' }}>Registre-se</Title>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
          <PersonIcon
            sx={{
              color: 'action.active',
              my: 0.5,
              position: 'absolute',
              zIndex: '10',
              top: '1rem',
            }}
          />
          <Input
            error={name.error}
            required={true}
            id="nome"
            fullWidth={true}
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            helperText={name.error}
            label="Nome"
            variant="standard"
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
          <EmailIcon
            sx={{
              color: 'action.active',
              my: 0.5,
              position: 'absolute',
              zIndex: '10',
              top: '1rem',
            }}
          />
          <Input
            error={email.error}
            required={true}
            id="email"
            fullWidth={true}
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            helperText={email.error}
            label="Email"
            variant="standard"
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          <LockIcon
            sx={{
              color: 'action.active',
              my: 0.5,
              position: 'absolute',
              zIndex: '10',
              top: '1rem',
            }}
          />
          <Input
            error={password.error}
            required={true}
            id="senha"
            fullWidth={true}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            helperText={password.error}
            label="Senha"
            variant="standard"
            type="password"
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        {mutation.isLoading ? (
          <ButtonComponent size="large" disabled aria-disabled={true}>
            Carregando...
          </ButtonComponent>
        ) : (
          <ButtonComponent size="large" onClick={registerUser}>
            Registrar
          </ButtonComponent>
        )}
        <RequestError mutation={mutation} />
      </FormControl>

      <Divider variant="inset" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          marginTop: '1.5rem',
          width: 'max-content',
        }}
      >
        <Typography>Possui uma conta?</Typography>
        <LinkComponent to="/login/aluno" decoration="underline" animation={false}>
          Log In
        </LinkComponent>
      </Box>
    </Box>
  );
};

export default RegisterForm;
