import { Box, Container, Grid, MenuItem, Typography, useMediaQuery } from '@mui/material';
import Invite from '../../components/Home/Invites/Invite';
import ButtonComponent from '../../components/Button';
import SelectComponent from '../../components/Form/Select';
import { useState } from 'react';
import ModalCreateInvite from './Modal/ModalCreateInvite';
import ModalAccessInvite from './Modal/ModalAccessInvite';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';

const Invites = () => {
  const [openModalCreateInvite, setOpenModalCreateInvite] = useState(false);
  const [openModalAccessInvite, setOpenModalAccessInvite] = useState(false);
  const [dataInvite, setDataInvite] = useState(null);
  const modalCreateInvite = () => setOpenModalCreateInvite(true);
  const modalAccessInvite = () => setOpenModalAccessInvite(true);
  const isMobile = useMediaQuery('(min-width: 768px)');

  const { data, isLoading } = useQuery(
    'invites',
    () => {
      return axios
        .get('http://127.0.0.1:8000/api/v1/convite')
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <Loading />;
  return (
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'auto 1fr' : '1fr',
        gap: '1rem',
        marginBottom: '2rem',
        marginTop: '2rem',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: '1.5rem',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: !isMobile && '1.5rem',
          }}
        >
          <Typography component="h1" variant="h3" fontWeight="800">
            Convites
          </Typography>
          <ButtonComponent onClick={modalCreateInvite}>Criar Convite</ButtonComponent>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: !isMobile ? '0rem' : '1rem',
            position: !isMobile && 'absolute',
            top: !isMobile && '-2rem',
            width: !isMobile && '100%',
            left: !isMobile && '0px',
            justifyContent: !isMobile && 'center',
            background: '#fff',
          }}
        >
          <SelectComponent
            label="Ordenar por:"
            sx={{ width: '100%' }}
            variant={!isMobile ? 'outlined' : 'standard'}
            value=""
          >
            <MenuItem value="recentes">Mais Recentes</MenuItem>
            <MenuItem value="antigos">Mais Antigos</MenuItem>
          </SelectComponent>
          <SelectComponent
            label="Tag:"
            sx={{ width: '100%' }}
            variant={!isMobile ? 'outlined' : 'standard'}
            value=""
          >
            <MenuItem value="game">Game</MenuItem>
            <MenuItem value="web">Web</MenuItem>
            <MenuItem value="desktop">Desktop</MenuItem>
          </SelectComponent>
        </Box>
      </Box>
      <Grid component="article" container alignItems="stretch" wrap="wrap" gap="1rem">
        {data &&
          data.data.map(({ titulo, descricao, dataCriacao, slug, autor }) => (
            <Invite
              key={slug}
              modalAccessInvite={modalAccessInvite}
              title={titulo}
              description={descricao}
              date={dataCriacao}
              author={autor}
              setDataInvite={setDataInvite}
            />
          ))}
      </Grid>

      {openModalCreateInvite && (
        <ModalCreateInvite
          openModal={openModalCreateInvite}
          setOpenModal={setOpenModalCreateInvite}
          title="Criar Convite"
          buttonTitle="Criar"
        />
      )}

      {openModalAccessInvite && (
        <ModalAccessInvite
          openModalAccessInvite={openModalAccessInvite}
          setOpenModalAccessInvite={setOpenModalAccessInvite}
          dataInvite={dataInvite}
        />
      )}
    </Container>
  );
};

export default Invites;
