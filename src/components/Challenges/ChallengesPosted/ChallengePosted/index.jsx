import { Box, Container, Paper, Typography } from '@mui/material';
import ButtonComponent from '../../../../components/Button';
import CreateChallenge from '../../CreateChallenge';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../../components/Title';
import { UserGlobalContext } from '../../../../contexts/UserContext';
import SnackbarRequest from '../../../SnackbarRequest';
import ChallengeForm from '../../ChallengeForm';
import ChallengeItem from './ChallengeItem';

const ChallengePosted = ({ data, user }) => {
  const { data: dataUser } = useContext(UserGlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [challenge, setChallenge] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
  });

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box
        sx={{
          display: 'grid',
          background: '#2563eb',
          height: '15rem',
          borderRadius: '6px',
        }}
      >
        <Box sx={{ alignSelf: 'end', color: '#fff', padding: '1rem 2rem' }}>
          <Title sx={{ color: '#fff' }}>Desafios</Title>
          <Typography marginLeft="2px">Leonardo Lucena</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {dataUser && dataUser.permissao === 'professor' && dataUser.apelido === user && (
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              alignItems: 'center',
              gap: '0.5rem 1rem',
              flexWrap: 'wrap',
            }}
            elevation={1}
          >
            <Typography>Poste um novo desafio!</Typography>
            <ButtonComponent size="small" onClick={() => setOpenModal(true)}>
              Criar Desafio
            </ButtonComponent>
          </Paper>
        )}

        {data &&
          data.map(({ desafio: { titulo, descricao, dataCriacao, slug }, autor }) => (
            <ChallengeItem
              key={slug}
              data={{ titulo, descricao, dataCriacao, slug, autor }}
              setChallenge={setChallenge}
              setOpenDialog={setOpenDialog}
              dataUser={dataUser}
            />
          ))}
      </Box>

      {openModal && (
        <CreateChallenge
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpenSnackbar={setOpenSnackbar}
          title="Criar Desafio"
          buttonTitle="Criar"
        />
      )}

      {openDialog && (
        <ChallengeForm
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          title="Editar Desafio"
          buttonTitle="Atualizar"
          setOpenSnackbar={setOpenSnackbar}
          challengeData={challenge}
        />
      )}

      {openSnackbar.open && (
        <SnackbarRequest
          message={openSnackbar.message}
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={openSnackbar.severity}
        />
      )}
    </Container>
  );
};

ChallengePosted.propTypes = {
  data: PropTypes.array,
  user: PropTypes.string,
};

export default ChallengePosted;
