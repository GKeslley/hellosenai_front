import { Check } from '@mui/icons-material';
import { Autocomplete, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const names = [
  'Humaira Sims',
  'Santiago Solis',
  'Dawid Floyd',
  'Mateo Barlow',
  'Samia Navarro',
  'Kaden Fields',
  'Genevieve Watkins',
  'Mariah Hickman',
  'Rocco Richardson',
  'Harris Glenn',
];

const MultiSelect = ({ label, placeholder, ...props }) => {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={names}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      loading={true}
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
  props: PropTypes.object,
};

export default MultiSelect;
