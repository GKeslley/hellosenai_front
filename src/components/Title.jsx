import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Title = ({ children, className, sx }) => {
  return (
    <Typography
      variant="h1"
      fontSize="3rem"
      fontWeight="600"
      className={`text-stone-800 font-bold ${className}`}
      sx={sx}
    >
      {children}
    </Typography>
  );
};

export default Title;

Title.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  sx: PropTypes.object,
};
