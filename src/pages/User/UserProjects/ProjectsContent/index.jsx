import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../../../../components/Helper/Loading';
import Stylebreak from '../../../../components/Stylebreak';
import ProjectItem from '../ProjectItem';
import PropTypes from 'prop-types';

const ProjectsContent = ({ page, infinite, setInfinite, username }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['userInvites', page],
    queryFn: () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      return axios
        .get(
          `http://127.0.0.1:8000/api/v1/usuario/${username}/projetos?page=${page}`,
          config,
        )
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (infinite && data && !data.links.next) {
    setInfinite(false);
  }

  if (isLoading) return <Loading />;
  return (
    <Grid container alignItems="stretch" wrap="wrap">
      {data ? (
        <>
          {data.data.map(({ imagem, slug, status }) => (
            <ProjectItem key={slug} data={{ imagem, slug, status }} />
          ))}
          <Stylebreak length={data.data.length - 1} width="300px" />
        </>
      ) : (
        <Typography>O usuário não possui projetos</Typography>
      )}
    </Grid>
  );
};

ProjectsContent.propTypes = {
  page: PropTypes.number,
  username: PropTypes.string,
  infinite: PropTypes.any,
  setInfinite: PropTypes.func,
};

export default ProjectsContent;
