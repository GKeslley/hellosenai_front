import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RequestError = ({ mutation }) => {
  const { isError, error } = mutation;

  return (
    <>
      {isError &&
        (Object.keys(error.response.data.errors).length > 1 ? (
          <Box>
            {Object.values(error.response.data.errors).map((type) => (
              <Typography color="red" fontSize="0.8rem" key={type}>
                {type}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography color="red" fontSize="0.8rem">
            {error.response.data.message}
          </Typography>
        ))}
    </>
  );
};

RequestError.propTypes = {
  mutation: PropTypes.object,
};

export default RequestError;
