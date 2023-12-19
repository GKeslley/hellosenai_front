import { Box, Paper } from '@mui/material';
import NavLinkActive from '../../../components/NavLink';
import { Route, Routes, useParams } from 'react-router-dom';
import ChallengesPerfomed from '../ChallengesPerfomed';
import ChallengesContent from './ChallengesContent';
import Error from '../../../pages/Error';

const ChallengesPosted = () => {
  const params = useParams();

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        flexGrow: '1',
      }}
    >
      <Box sx={{ marginBottom: '2rem' }}>
        <Paper sx={{ borderRadius: '0', marginBottom: '2rem', overflow: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
            <NavLinkActive
              to={`/desafios/${params.user}`}
              background="#000"
              color="inherit"
              sx={{ padding: '1rem 2rem', whiteSpace: 'nowrap' }}
              after={{ bottom: '0', left: '0' }}
              end={true}
            >
              Desafios
            </NavLinkActive>
            <NavLinkActive
              to={`/desafios/${params.user}/realizados`}
              background="#000"
              color="inherit"
              sx={{ padding: '1rem 2rem', whiteSpace: 'nowrap' }}
              after={{ bottom: '0', left: '0' }}
            >
              Desafios Realizados
            </NavLinkActive>
          </Box>
        </Paper>

        <Routes>
          <Route path="/" element={<ChallengesContent username={params.user} />}></Route>
          <Route path="realizados" element={<ChallengesPerfomed />}></Route>
          <Route
            path="*"
            element={<Error message="Página não encontrada" statusCode="400" />}
          ></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default ChallengesPosted;
