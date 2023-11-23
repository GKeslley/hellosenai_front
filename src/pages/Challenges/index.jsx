import { Box, Container } from '@mui/material';
import Challenge from './Challenge';

const Challenges = () => {
  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '2rem' }}>
      <Challenge />
      <Challenge />
      <Challenge />
      <Challenge />
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
    </Container>
  );
};

export default Challenges;
