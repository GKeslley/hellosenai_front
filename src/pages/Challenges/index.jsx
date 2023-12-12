import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import ChallengeCards from '../../components/Challenges/ChallengesCards';
import { Route, Routes } from 'react-router';
import ChallengesPosted from '../../components/Challenges/ChallengesPosted';

const Challenges = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data, isLoading, error } = useQuery(
    'teachers',
    () => {
      return axios
        .get('http://127.0.0.1:8000/api/v1/professor')
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isLoading) return <Loading />;
  if (error) return null;
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        flexGrow: '1',
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        data={data}
      />

      <Routes>
        <Route path='/' element={<ChallengeCards data={data} />}></Route>
        <Route path=":user/*" element={<ChallengesPosted />}></Route>
      </Routes>
      
    </Box>
  );
};

export default Challenges;



