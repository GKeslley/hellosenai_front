import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  sx,
  children,
  className,
  onClick,
  variant,
  size = 'large',
  isLoading = false,
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <Button
          size={size}
          disabled
          aria-disabled={true}
          variant={`${variant ? variant : 'contained'}`}
          className={`justify-self-center max-w-max ${className}`}
          sx={sx}
        >
          Carregando...
        </Button>
      ) : (
        <Button
          variant={`${variant ? variant : 'contained'}`}
          onClick={onClick}
          className={`justify-self-center max-w-max ${className}`}
          size={size}
          sx={sx}
          {...props}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;

ButtonComponent.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
};
