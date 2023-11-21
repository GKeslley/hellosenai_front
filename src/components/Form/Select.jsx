import { FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const SelectComponent = ({
  children,
  value,
  setValue,
  label,
  variant = 'standard',
  sx,
  isMobile,
}) => {
  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return (
    <FormControl variant={variant} sx={{ minWidth: 140, ...sx }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
        sx={{ borderRadius: !isMobile && '0px' }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

SelectComponent.propTypes = {
  children: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  label: PropTypes.string,
  variant: PropTypes.string,
  isMobile: PropTypes.bool,
  sx: PropTypes.object,
};

export default SelectComponent;
