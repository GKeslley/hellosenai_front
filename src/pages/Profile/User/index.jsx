import { Box, FormControl, TextField } from '@mui/material';
import ButtonComponent from '../../../components/Button';

const User = () => {
  return (
    <Box sx={{ display: 'grid', width: '100%' }}>
      <FormControl sx={{ display: 'grid', gap: '1rem' }}>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <TextField required id="name-required" label="Nome" sx={{ flexGrow: '1' }} />
          <TextField
            required
            id="username-required"
            label="Apelido"
            sx={{ flexGrow: '1' }}
          />
        </Box>
        <TextField required id="email-required" fullWidth label="Email" />
        <TextField required id="password-required" fullWidth label="Senha" />
        <ButtonComponent sx={{ justifySelf: 'right', height: 'max-content' }}>
          Atualizar
        </ButtonComponent>
      </FormControl>
    </Box>
  );
};

export default User;
