import { Check } from '@mui/icons-material';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const MultiSelect = ({ label, placeholder, options, isLoading, ...props }) => {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={options ? options : []}
      getOptionLabel={(option) => option || ''}
      filterSelectedOptions
      includeInputInList
      filterOptions={(x) => x}
      disableCloseOnSelect
      clearOnBlur
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: 'space-between' }}
        >
          {option}
          {selected ? <Check color="info" /> : null}
        </MenuItem>
      )}
      {...props}
    />
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  options: PropTypes.array,
  props: PropTypes.object,
};

export default MultiSelect;
