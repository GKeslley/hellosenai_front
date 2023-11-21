import { Box } from '@mui/material';
import ProfileInvite from './ProfileInvite';

const ProfileInvites = () => {
  return (
    <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <ProfileInvite />
      <ProfileInvite />
      <ProfileInvite />
    </Box>
  );
};

export default ProfileInvites;
