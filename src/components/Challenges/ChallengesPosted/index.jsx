import { Box, Paper } from '@mui/material';
import NavLinkActive from '../../../components/NavLink';
import { Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../../../components/Helper/Loading';
import ChallengePosted from './ChallengePosted';
import ChallengesPerfomed from '../ChallengesPerfomed';

const fetchChallengesByTeacher = async (username) => {
  const response = await axios
    .get(`http://127.0.0.1:8000/api/v1/professor/${username}/desafios`)
    .then((response) => response.data);
  return response.data;
};

const ChallengesPosted = () => {
  const params = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['challengesTeacher'],
    queryFn: () => {
      return fetchChallengesByTeacher(params.user);
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (error) return null;
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
          <Route
            path="/"
            element={<ChallengePosted data={data} user={params.user} />}
          ></Route>
          <Route path="realizados" element={<ChallengesPerfomed />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default ChallengesPosted;
