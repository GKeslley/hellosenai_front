import { Box, Container, Paper, Typography } from '@mui/material';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import ChallengePosted from '../ChallengePosted';
import Title from '../../../Title';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../../Button';
import { useContext, useState } from 'react';
import { UserGlobalContext } from '../../../../contexts/UserContext';
import CreateChallenge from '../../CreateChallenge';
import ChallengeForm from '../../ChallengeForm';
import SnackbarRequest from '../../../SnackbarRequest';
import PropTypes from 'prop-types';

const ChallengesContent = ({ username }) => {
  const { data: dataUser } = useContext(UserGlobalContext);
  const [author, setAuthor] = useState({ name: '', username: '' });
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const { pages, infinite, setInfinite } = useInfiniteScroll();
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
          <Box component={Link} to={`/usuario/${author.name}`} sx={{ marginLeft: '2px' }}>
            {author.username}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {dataUser &&
          dataUser.permissao === 'professor' &&
          dataUser.apelido === username && (
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

        {pages.map((page) => (
          <ChallengePosted
            key={page}
            page={page}
            infinite={infinite}
            setInfinite={setInfinite}
            username={username}
            author={author}
            setAuthor={setAuthor}
            setChallenge={setChallenge}
            setOpenDialog={setOpenDialog}
            dataUser={dataUser}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
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

ChallengesContent.propTypes = {
  username: PropTypes.string,
};

export default ChallengesContent;
