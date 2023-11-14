import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Subtitle = ({ children, sx }) => {
  return (
    <Typography
      variant="h2"
      fontSize="2.3rem"
      fontWeight="400"
      sx={sx}
      className="text-stone-400 font-bold"
    >
      {children}
    </Typography>
  );
};

export default Subtitle;

Subtitle.propTypes = {
  children: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
