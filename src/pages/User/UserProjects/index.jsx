import { Box, Grid, Typography } from '@mui/material';
import Loading from '../../../components/Helper/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stylebreak from '../../../components/Stylebreak';

const UserProjects = ({ username }) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading } = useQuery(
    'userInvites',
    () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/usuario/${username}/projetos`, config)
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
      marginBottom="2rem"
    >
      {data && data.data.length ? (
        <>
          {data.data.map(({ imagem, slug, status }) => (
            <Grid
              component={Link}
              to={`/projetos/${slug}`}
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
                margin: '0 1% 24px',
              }}
            >
              <Box component="figure" sx={{ height: '100%', position: 'relative' }}>
                {status === 1 ? (
                  <Box
                    component="img"
                    sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                    src={`http://127.0.0.1:8000${imagem}`}
                    alt={imagem}
                  />
                ) : (
                  <Box sx={{ height: '100%' }}>
                    <Box
                      component="img"
                      sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                      src={`http://127.0.0.1:8000${imagem}`}
                      alt={imagem}
                    />
                    <Box
                      sx={{
                        display: 'grid',
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '100%',
                        width: '100%',
                        opacity: '0.8',
                        backgroundColor: '#2d2d2d',
                        '&::after': {
                          content: '"Desativado"',
                          fontSize: '2rem',
                          color: '#fff',
                          position: 'absolute',
                          placeSelf: 'center',
                        },
                      }}
                    ></Box>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
          <Stylebreak length={data.data.length - 1} width="250px" />
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
