import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RequestError = ({ mutation }) => {
  const { isError, error } = mutation;

  return (
    <>
      {isError && (
        <>
          {typeof error.response.data === 'object' ? (
            <Box>
              {Object.values(error.response.data.errors).map((type) => (
                <Typography color="red" fontSize="0.8rem" key={type}>
                  {type}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography color="red" fontSize="0.8rem">
              {error.response.data}
            </Typography>
          )}
        </>
      )}
    </>
  );
};

RequestError.propTypes = {
  mutation: PropTypes.object,
};

export default RequestError;
