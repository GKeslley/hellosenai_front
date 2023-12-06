import { Box, Grid, Typography } from '@mui/material';
import Loading from '../../../components/Helper/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserProjects = ({ username }) => {
  const { data, isLoading } = useQuery(
    'userInvites',
    () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/usuario/pessoa2067a1071/projetos`)
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <Loading />;
  return (
    <Grid
      component="article"
      container
      alignItems="stretch"
      wrap="wrap"
      gap="1rem"
      marginBottom="2rem"
    >
      {data && data.data.length ? (
        <>
          {data.data.map(({ imagem, slug }) => (
            <Grid
              component={Link}
              to={`/desafios/${slug}`}
              key={slug}
              item
              xs
              minWidth="250px"
              maxHeight="250px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              sx={{
                position: 'relative',
              }}
            >
              <Box component="figure" sx={{ height: '100%' }}>
                <Box
                  component="img"
                  sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                  src={`http://127.0.0.1:8000${imagem}`}
                  alt={imagem}
                />
              </Box>
            </Grid>
          ))}
        </>
      ) : (
        <Typography>O usuário não possui projetos</Typography>
      )}
    </Grid>
  );
};

UserProjects.propTypes = {
  username: PropTypes.string,
};

export default UserProjects;
