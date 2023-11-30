import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const Input = ({
  required,
  id,
  fullWidth,
  label,
  variant = 'outlined',
  isError,
  value,
  onChange,
  onBlur,
  helperText,
  ...props
}) => {
  return (
    <TextField
      id={id}
      required={required}
      fullWidth={fullWidth}
      label={label}
      variant={variant}
      error={isError}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      {...props}
    />
  );
};

Input.propTypes = {
  required: PropTypes.bool,
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  isError: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  helperText: PropTypes.string,
};

export default Input;
