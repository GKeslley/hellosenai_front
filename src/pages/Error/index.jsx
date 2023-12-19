import { Container, Typography, useMediaQuery } from '@mui/material';
import Title from '../../components/Title';
import PropTypes from 'prop-types';

const Error = ({ message, statusCode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container
      sx={{
        textAlign: 'center',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Title sx={{ fontSize: isMobile ? '10rem' : '20rem', lineHeight: '1' }}>
        {statusCode}
      </Title>
      <Typography fontSize="1.5rem" textTransform="uppercase">
        {message}
      </Typography>
    </Container>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  statusCode: PropTypes.string,
};

export default Error;
