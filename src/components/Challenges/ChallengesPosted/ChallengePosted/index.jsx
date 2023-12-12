import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import ButtonComponent from '../../../../components/Button';
import CreateChallenge from '../../CreateChallenge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../../components/Title';

const ChallengePosted = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

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
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            alignItems: 'center',
          }}
          elevation={1}
        >
          <Typography>Poste um novo desafio!</Typography>
          <ButtonComponent size="small" onClick={() => setOpenModal(true)}>
            Criar Desafio
          </ButtonComponent>
        </Paper>

        {data &&
          data.map(({ desafio: { titulo, descricao, dataCriacao, slug }, autor }) => (
            <>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1rem',
                  border: '0.0625rem solid #dadce0',
                }}
                elevation={0}
                key={titulo}
              >
                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Avatar />
                  <Box>
                    <Typography fontSize="0.875rem">{autor.nome}</Typography>
                    <Typography
                      component="time"
                      fontSize="0.75rem"
                      color="rgb(169, 162, 151)"
                    >
                      {dataCriacao}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <Typography fontWeight="800">{titulo}</Typography>
                  <Typography sx={{ whiteSpace: 'pre-line' }}>{descricao}</Typography>
                  <ButtonComponent
                    sx={{ alignSelf: 'end' }}
                    component={Link}
                    to={`/projetos?desafio=${slug}`}
                  >
                    Realizar
                  </ButtonComponent>
                </Box>
              </Paper>
            </>
          ))}
      </Box>

      {openModal && (
        <CreateChallenge
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Criar Desafio"
          buttonTitle="Criar"
        />
      )}
    </Container>
  );
};

ChallengePosted.propTypes = {
  data: PropTypes.array,
};

export default ChallengePosted;