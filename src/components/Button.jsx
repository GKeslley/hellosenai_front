import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonComponent = ({ sx, children, onClick, variant, ...props }) => {
  return (
    <Button
      variant={`${variant ? variant : 'contained'}`}
      onClick={onClick}
      className="justify-self-center max-w-max"
      sx={sx}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;

ButtonComponent.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};
