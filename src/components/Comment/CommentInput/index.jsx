import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CommentInput = ({ handleOpenComment, input }) => {
  return (
    <TextField
      placeholder="Deixe um comentário..."
      sx={{ flexGrow: '1', minWidth: '1rem' }}
      variant="standard"
      onChange={input.onChange}
      value={input.value}
      onClick={handleOpenComment ? handleOpenComment : null}
    />
  );
};

CommentInput.propTypes = {
  handleOpenComment: PropTypes.any,
  input: PropTypes.object,
};

export default CommentInput;
