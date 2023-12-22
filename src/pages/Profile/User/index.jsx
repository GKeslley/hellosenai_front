import { Box, FormControl } from '@mui/material';
import ButtonComponent from '../../../components/Button';
import { UserGlobalContext } from '../../../contexts/UserContext';
import { useContext } from 'react';
import useForm from '../../../hooks/useForm';
import { useState } from 'react';
import Input from '../../../components/Form/Input';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import RequestError from '../../../components/Helper/RequestError';
import PropTypes from 'prop-types';

const User = ({ setOpenSnackbar }) => {
  const { data } = useContext(UserGlobalContext);
  const queryClient = useQueryClient();
  const name = useForm(true);
  const username = useForm(true);
  const email = useForm('email');

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.put(
        `http://127.0.0.1:8000/api/v1/usuario/${data.apelido}`,
        data,
        config,
      );
    },
    onSuccess: ({ data }) => {
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user'], type: 'active' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const updateUserData = () => {
    if (name.validate() && username.validate() && email.validate()) {
      const token = localStorage.getItem('token');
      const data = {
        nome: name.value,
        apelido: username.value,
        email: email.value,
      };
      mutation.mutate({ data, token });
    }
  };

  useState(() => {
    if (data) {
      name.setValue(data.nome);
      username.setValue(data.apelido);
      email.setValue(data.email);
    }
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Input
            required={true}
            id="name-required"
            label="Nome"
            value={name.value}
            onChange={name.onChange}
            isError={name.error.isError}
            onBlur={name.onBlur}
            helperText={name.error.message}
            sx={{ flexGrow: '1' }}
          />

          <Input
            required={false}
            id="username-required"
            label="Apelido"
            value={username.value}
            onChange={username.onChange}
            isError={username.error.isError}
            onBlur={username.onBlur}
            helperText={username.error.message}
            sx={{ flexGrow: '1' }}
          />
        </Box>

        <Input
          type="email"
          required={true}
          id="email-required"
          fullWidth={true}
          label="Email"
          value={email.value}
          onChange={email.onChange}
          isError={email.error.isError}
          onBlur={email.onBlur}
          helperText={email.error.message}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <ButtonComponent
            sx={{ alignSelf: 'end', height: 'max-content' }}
            onClick={updateUserData}
            isLoading={mutation.isLoading}
          >
            Atualizar
          </ButtonComponent>
          <RequestError mutation={mutation} />
        </Box>
      </FormControl>
    </Box>
  );
};

User.propTypes = {
  setOpenSnackbar: PropTypes.func,
};

export default User;
