import { Box, Typography, styled } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import ButtonComponent from '../../Button';
import SnackbarRequest from '../../SnackbarRequest';
import { UserGlobalContext } from '../../../contexts/UserContext';

const BootstrapButton = styled(ButtonComponent)({
  backgroundColor: '#e54',
  borderColor: '#e54',
  '&:hover': {
    backgroundColor: '#ec4a38',
    borderColor: '#f33a25',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ec4a38',
    borderColor: '#f33a25',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem #ee5544ac',
  },
});

const DisableAccount = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { logout } = useContext(UserGlobalContext);

  const mutation = useMutation({
    mutationFn: (token) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.put(
        'http://127.0.0.1:8000/api/v1/usuario/conta/desativar',
        null,
        config,
      );
    },
    onSuccess: () => {
      logout();
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const disableAccount = () => {
    if (confirm('Realmente deseja desativar sua conta?') === true) {
      const token = localStorage.getItem('token');
      mutation.mutate(token);
    }
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography>Desativar Conta</Typography>
          <Typography component="span" fontSize="0.75rem" color="#ccc">
            Desativando sua conta, seus dados continuam salvos
          </Typography>
        </Box>
        <BootstrapButton size="md" onClick={disableAccount}>
          Desativar
        </BootstrapButton>
      </Box>
      {openSnackbar && (
        <SnackbarRequest
          message={mutation.error.response.data.message}
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={'error'}
        />
      )}
    </>
  );
};

export default DisableAccount;
