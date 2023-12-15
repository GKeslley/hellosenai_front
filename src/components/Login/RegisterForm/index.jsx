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
import { useNavigate } from 'react-router';
import RequestError from '../../Helper/RequestError';
import { useContext } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';

const RegisterForm = () => {
  const { setToken } = useContext(UserGlobalContext);
  const name = useForm(true);
  const email = useForm('email');
  const password = useForm('password');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post('http://127.0.0.1:8000/api/v1/usuario', data);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.plainTextToken);
      setToken(data.plainTextToken);
      navigate('/');
    },
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
            error={name.error.isError}
            required={true}
            id="nome"
            fullWidth={true}
            value={name.value}
            onChange={name.onChange}
            onBlur={name.onBlur}
            helperText={name.error.isError && name.error.message}
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
            error={email.error.isError}
            required={true}
            id="email"
            fullWidth={true}
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            helperText={name.error.isError && name.error.message}
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
            error={password.error.isError}
            required={true}
            id="senha"
            fullWidth={true}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            helperText={name.error.isError && name.error.message}
            label="Senha"
            variant="standard"
            type="password"
            sx={{
              '& .MuiFormLabel-root': { marginLeft: '40px' },
              '& .MuiInputBase-input': { paddingLeft: '40px' },
            }}
          />
        </Box>

        <ButtonComponent
          size="large"
          onClick={registerUser}
          isLoading={mutation.isLoading}
        >
          Registrar
        </ButtonComponent>
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
