import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Stylebreak = ({ length, width, sx }) => {
  const elements = Array(length).fill(0);
  return (
    <>
      {elements.map((e, i) => (
        <Box
          key={i}
          sx={{
            height: 0,
            width: width,
            minWidth: width,
            flexGrow: '1',
            margin: '0 1% 24px',
            flex: '1',
            marginTop: 0,
            marginBottom: 0,
            ...sx
          }}
        ></Box>
      ))}
    </>
  );
};

Stylebreak.propTypes = {
  length: PropTypes.number,
  width: PropTypes.string,
  sx: PropTypes.object,
};

export default Stylebreak;
