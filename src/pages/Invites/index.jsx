import { Box, Container, MenuItem, Typography, useMediaQuery } from '@mui/material';
import Invite from '../../components/Home/Invites/Invite';
import ButtonComponent from '../../components/Button';
import SelectComponent from '../../components/Form/Select';
import { useState } from 'react';
import ModalCreateInvite from './Modal/ModalCreateInvite';
import ModalAccessInvite from './Modal/ModalAccessInvite';

const Invites = () => {
  const [openModalCreateInvite, setOpenModalCreateInvite] = useState(false);
  const [openModalAccessInvite, setOpenModalAccessInvite] = useState(false);

  const modalCreateInvite = () => setOpenModalCreateInvite(true);
  const modalAccessInvite = () => setOpenModalAccessInvite(true);
  const isMobile = useMediaQuery('(min-width: 768px)');

  return (
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'auto 1fr' : '1fr',
        gap: '1rem',
        marginBottom: '2rem',
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
          >
            <MenuItem value="recentes">Mais Recentes</MenuItem>
            <MenuItem value="antigos">Mais Antigos</MenuItem>
          </SelectComponent>
          <SelectComponent
            label="Tag:"
            sx={{ width: '100%' }}
            variant={!isMobile ? 'outlined' : 'standard'}
          >
            <MenuItem value="game">Game</MenuItem>
            <MenuItem value="web">Web</MenuItem>
            <MenuItem value="desktop">Desktop</MenuItem>
          </SelectComponent>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Invite modalAccessInvite={modalAccessInvite} />
        <Invite modalAccessInvite={modalAccessInvite} />
        <Invite modalAccessInvite={modalAccessInvite} />
        <Invite modalAccessInvite={modalAccessInvite} />
        <Invite modalAccessInvite={modalAccessInvite} />
        <Invite modalAccessInvite={modalAccessInvite} />
      </Box>

      <ModalCreateInvite
        openModal={openModalCreateInvite}
        setOpenModal={setOpenModalCreateInvite}
        title="Criar Convite"
        buttonTitle="Criar"
      />

      <ModalAccessInvite
        openModalAccessInvite={openModalAccessInvite}
        setOpenModalAccessInvite={setOpenModalAccessInvite}
      />
    </Container>
  );
};

export default Invites;
