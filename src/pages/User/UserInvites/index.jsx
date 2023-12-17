import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import InvitesContent from './InvitesContent';

const UserInvites = ({ username }) => {
  const { pages, infinite, setInfinite } = useInfiniteScroll();

  return (
    <Container>
      {pages.map((page) => (
        <InvitesContent
          key={page}
          username={username}
          page={page}
          infinite={infinite}
          setInfinite={setInfinite}
        />
      ))}
    </Container>
  );
};

UserInvites.propTypes = {
  username: PropTypes.string,
};

export default UserInvites;
