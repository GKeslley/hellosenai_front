import { Box } from '@mui/material';
import ProfileProject from './ProfileProject';

const ProfileProjects = () => {
  return (
    <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <ProfileProject />
      <ProfileProject />
      <ProfileProject />
    </Box>
  );
};

export default ProfileProjects;
