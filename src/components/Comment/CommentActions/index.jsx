import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CommentActions = ({ handleCloseComment, input, onClick, isLoading }) => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem', alignSelf: 'end' }}>
      <Button onClick={handleCloseComment}>Cancelar</Button>
      {!input.value ? <Button disabled>Comentar</Button> : isLoading ? 
      <Button>Carregando...</Button> : 
      <Button onClick={onClick}>Comentar</Button>}
    </Box>
  );
};

CommentActions.propTypes = {
  handleCloseComment: PropTypes.func,
  input: PropTypes.object,
};

export default CommentActions;
