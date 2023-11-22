import { Box, Divider, FormControl, TextField, Typography } from "@mui/material";
import Input from "../../Form/Input";
import Title from "../../Title";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ButtonComponent from '../../Button'
import LinkComponent from '../../Link'
import PersonIcon from '@mui/icons-material/Person';

const RegisterForm = () => {
  return (
    <Box sx={{position: 'relative'}}>
      <Title sx={{marginBottom: '1.5rem'}}>Registre-se</Title>
      <FormControl sx={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem'}}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PersonIcon sx={{ color: 'action.active', my: 0.5, position: 'absolute', zIndex: '10' }} />
          <Input required={true} id='nome' fullWidth={true} label='Nome' variant="standard" 
          sx={{'& .MuiFormLabel-root': {marginLeft: '40px'}, '& .MuiInputBase-input': {paddingLeft: '40px'}}} />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', my: 0.5, position: 'absolute', zIndex: '10' }} />
          <Input required={true} id='email' fullWidth={true} label='Email' variant="standard" 
          sx={{'& .MuiFormLabel-root': {marginLeft: '40px'}, '& .MuiInputBase-input': {paddingLeft: '40px'}}} />
        </Box>
  
        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <LockIcon sx={{ color: 'action.active', my: 0.5, position: 'absolute', zIndex: '10' }} />
          <Input required={true} id='senha' fullWidth={true} label='Senha' variant="standard" type='password'
          sx={{'& .MuiFormLabel-root': {marginLeft: '40px'}, '& .MuiInputBase-input': {paddingLeft: '40px'}}} />
        </Box>
  
        <ButtonComponent size='large'>Registrar</ButtonComponent>
      </FormControl>
  
      <Divider variant="inset" />
  
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem', width: 'max-content'}}>
        <Typography>Possui uma conta?</Typography>
        <LinkComponent to='/login/aluno' decoration="underline" animation={false}>Log In</LinkComponent>
      </Box>
    </Box>
    );
};

export default RegisterForm;
