import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectItem = ({ data }) => {
  return (
    <>
      <Grid
        component={Link}
        to={`/projetos/${data.slug}`}
        item
        xs
        minWidth="300px"
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
          {typeof data.status === 'number' && (
            <>
              {data.status === 1 ? (
                <Box
                  component="img"
                  sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                  src={`http://127.0.0.1:8000${data.imagem}`}
                  alt={data.imagem}
                />
              ) : (
                <Box sx={{ height: '100%' }}>
                  <Box
                    component="img"
                    sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                    src={`http://127.0.0.1:8000${data.imagem}`}
                    alt={data.imagem}
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
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};

ProjectItem.propTypes = {
  data: PropTypes.object,
};

export default ProjectItem;
