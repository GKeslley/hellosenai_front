import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        top: '0',
        left: '0',
        zIndex: '1000',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          width: '80px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '5px',
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loading;
