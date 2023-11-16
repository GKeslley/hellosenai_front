import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Invites from '../index';
import Wave from '../../../Wave';
import net from '../../../../assets/net6.png';
import Title from '../../../Title';

const InvitesInfos = ({ refInvites }) => {
  return (
    <>
      <Box
        ref={refInvites}
        className="relative bg-gradient-to-r from-blue-header to-blue-600 py-8 text-center"
      >
        <Wave />
        <Container className="mt-9">
          <Title sx={{ color: '#fff' }}>Conecte-se Com Outros Alunos Senai</Title>
          <Box className="grid justify-items-center mt-9 items-center md:grid-cols-2 md:justify-items-start">
            <Box component="img" src={net} alt="test"></Box>
            <Invites />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default InvitesInfos;

InvitesInfos.propTypes = {
  refInvites: PropTypes.object,
};
