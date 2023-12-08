import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import Denounces from '../../components/Denounces';
import teacherImage from '../../assets/login/pvta.png';

const Adm = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Box>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '1rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
        >
          <Avatar
            src={teacherImage}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Novo Professor
          </Typography>
        </Paper>
      </Box>

      {<Denounces />}
    </Container>
  );
};

export default Adm;
