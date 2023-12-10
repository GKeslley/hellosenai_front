import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

const SnackbarRequest = ({ message, open, onClose, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarRequest.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  severity: PropTypes.string,
};

export default SnackbarRequest;
