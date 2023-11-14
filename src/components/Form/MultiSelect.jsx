import { Check } from '@mui/icons-material';
import { Autocomplete, MenuItem, TextField } from '@mui/material';

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

const MultiSelect = () => {
  return (
    <Autocomplete
      multiple
      options={names}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      loading={true}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Participantes"
          placeholder="Participante"
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
    />
  );
};

export default MultiSelect;
