import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  ListItem,
  Typography,
} from '@mui/material';
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
import { useContext, useRef, useState } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import ModalComponent from '../../Modal';

const RegisterForm = () => {
  const [openAgreement, setOpenAgreement] = useState(false);
  const { setToken } = useContext(UserGlobalContext);
  const name = useForm(true);
  const email = useForm('email');
  const password = useForm('password');
  const agremeentRef = useRef();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post('http://127.0.0.1:8000/api/v1/usuario', data);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.plainTextToken);
      localStorage.setItem('termos', true);
      setToken(data.plainTextToken);
      navigate('/');
    },
  });

  const registerUser = async () => {
    if (
      name.validate() &&
      email.validate() &&
      password.validate() &&
      agremeentRef.current.checked
    ) {
      mutation.mutate({
        nome: name.value,
        email: email.value,
        senha: password.value,
      });
    }
  };

  const handleOpenAgreement = (event) => {
    event.preventDefault();
    setOpenAgreement(true);
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

        <FormControlLabel
          control={<Checkbox inputRef={agremeentRef} />}
          label={
            <Typography>
              <Link onClick={handleOpenAgreement}>Eu aceito os termos e condições*</Link>
            </Typography>
          }
          sx={{ textDecoration: 'underline' }}
          co
        />

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

      {openAgreement && (
        <ModalComponent openModal={openAgreement} setOpenModal={setOpenAgreement}>
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              alignItems: 'start',
            }}
          >
            <Typography fontSize="1.2rem" fontWeight="500">
              Diretrizes da plataforma:
            </Typography>
            <Typography>
              Ao se cadastrar na plataforma você concorda com os termos a seguir:
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              1ª Em hipótese alguma compartilhar qualquer conteúdo considerado criminoso
              ou sensível, ou seja, imagens que remetam a violência de qualquer natureza,
              estando passível a banimento;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              2ª Em caso de compartilhamento de dados pessoais como telefone, endereço e
              outros, a plataforma estará isenta de qualquer responsabilidade, podendo a
              qualquer momento deletar a postagem, ou comentário, ou até mesmo banir o
              usuário em casos considerados extremos, isentando a administração da
              plataforma de qualquer justificativa;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              3ª Em hipótese alguma o usuário poderá utilizar os espaços da plataforma,
              que tem seus objetivos específicos, como por exemplo: espaço de criação de
              convite deverá ser utilizado único e exclusivamente para criar os convites
              dos projetos para qualquer informação que fuja os objetivos delimitados;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              4ª Os usuários devem agir de forma cordial com os demais. Evitando qualquer
              tipo de violência verbal, ameaças e qualquer outro tipo de comportamento
              violento. Constatado qualquer comportamento como o supracitado, o usuário
              poderá ser banido e a administração da plataforma estará isenta de qualquer
              justificativa.
            </Typography>
          </ListItem>
        </ModalComponent>
      )}
    </Box>
  );
};

export default RegisterForm;
