import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Title = ({ children, sx }) => {
  return (
    <Typography
      variant="h1"
      fontSize="2.5rem"
      fontWeight="600"
      sx={sx}
      className="text-stone-800 font-bold"
    >
      {children}
    </Typography>
  );
};

export default Title;

Title.propTypes = {
  children: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
