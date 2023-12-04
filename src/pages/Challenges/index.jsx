import { Box, useMediaQuery } from '@mui/material';
import Challenge from './Challenge';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';

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

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          marginTop: '2rem',
          padding: isMobile ? '0 1rem' : '0 2rem',
          alignSelf: 'flex-start',
        }}
      >
        {data &&
          data.data.map(({ nome, apelido, desafios }) => (
            <Challenge
              key={apelido}
              name={nome}
              username={apelido}
              challenges={desafios}
            />
          ))}
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginTop: 0,
            marginBottom: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Challenges;
