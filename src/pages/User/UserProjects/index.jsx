import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import ProjectsContent from './ProjectsContent';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const UserProjects = ({ username }) => {
  const { pages, infinite, setInfinite } = useInfiniteScroll();

  return (
    <Container>
      {pages.map((page) => (
        <ProjectsContent
          key={page}
          page={page}
          username={username}
          infinite={infinite}
          setInfinite={setInfinite}
        />
      ))}
    </Container>
  );
};

UserProjects.propTypes = {
  username: PropTypes.string,
};

export default UserProjects;
