import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RequestError = ({ mutation }) => {
  const { isError, error } = mutation;

  console.log(mutation);

  return (
    <>
      {isError && (
        <>
          {error.response.data?.errors !== undefined ? (
            <Box>
              {Object.values(error.response.data?.errors).map((type) => (
                <Typography color="red" fontSize="0.8rem" key={type} textAlign="right">
                  {type}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography color="red" fontSize="0.8rem" textAlign="right">
              {error.response.data.message}
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
