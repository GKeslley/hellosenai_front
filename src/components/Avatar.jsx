import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';

const AvatarUser = ({ avatar, sx }) => {
  return (
    <>
      {avatar ? (
        <Avatar src={`http://127.0.0.1:8000${avatar}`} sx={sx} />
      ) : (
        <Avatar sx={sx} />
      )}
    </>
  );
};

AvatarUser.propTypes = {
  avatar: PropTypes.string,
  sx: PropTypes.object,
};

export default AvatarUser;
