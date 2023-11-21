import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Subtitle = ({ children, sx }) => {
  return (
    <Typography
      variant="h2"
      fontSize="2rem"
      fontWeight="400"
      sx={{ fontWeight: '800', marginBottom: '2rem', ...sx }}
      className="text-[#131B24]"
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
