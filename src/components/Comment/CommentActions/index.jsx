import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CommentActions = ({ handleCloseComment, input }) => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem', alignSelf: 'end' }}>
      <Button onClick={handleCloseComment}>Cancelar</Button>
      <Button disabled={!input.value}>Comentar</Button>
    </Box>
  );
};

CommentActions.propTypes = {
  handleCloseComment: PropTypes.func,
  input: PropTypes.object,
};

export default CommentActions;
