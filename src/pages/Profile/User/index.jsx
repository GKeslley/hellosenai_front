import { Box, FormControl, TextField } from '@mui/material';
import ButtonComponent from '../../../components/Button';
import { UserGlobalContext } from '../../../contexts/UserContext';
import { useContext } from 'react';
import useForm from '../../../hooks/useForm';
import { useState } from 'react';
import Input from '../../../components/Form/Input';
import RequestError from '../../../components/Helper/RequestError';
import { useMutation } from 'react-query';

const User = () => {
  const { data } = useContext(UserGlobalContext);
  const name = useForm(true)
  const username = useForm(true)
  const email = useForm('email')

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const mutation = useMutation((data) => {
    return axios.put('http://127.0.0.1:8000/api/v1/usuario', data);
  });

  const updateUserData = () => {
    if (name.validate() && username.validate() && email.validate()) {
      mutation.mutate({
        nome: name.value,
        apelido: username.value,
        email: email.value,
      })
    }
  }

  useState(() => {
    if (data) {
      name.setValue(data.nome)
      username.setValue(username.apelido)
      email.setValue(email.email)
    }
  }, [])

  return (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <FormControl sx={{ display: 'flex', flexDirection: 'column' ,gap: '1rem' }}>
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
          type='email'
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

        <ButtonComponent sx={{ alignSelf: 'end', height: 'max-content' }} onClick={updateUserData}>
          Atualizar
        </ButtonComponent>
      </FormControl>
    </Box>
  );
};

export default User;
