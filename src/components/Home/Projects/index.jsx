import Typography from '@mui/material/Typography';
import Subtitle from '../../Subtitle';
import teste from '../../../assets/logo.png';
import teste2 from '../../../assets/logo2.png';
import { Box, Container, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../Helper/Loading';
import Image from '../../Helper/Image';

const styleImageTransition = {
  transition: 'transform .5s ease',
  ':hover': { transform: 'scale(1.03)' },
};

const Projects = ({ refProject }) => {
  const isSmallSmartphone = useMediaQuery('(min-width: 400px)');

  const { data, isLoading, error } = useQuery({
    queryKey: ['projectsHome'],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/projeto?limit=3`)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (isLoading) return <Loading />;
  return (
    <Container ref={refProject}>
      <Subtitle>Projetos Recentes</Subtitle>
      <Box className="flex flex-col gap-8 md:grid md:grid-cols-projects">
        <Box
          component="li"
          className="row-span-3 col-column-1-13 h-full lg:col-column-1-9"
          sx={{ minWidth: !isSmallSmartphone ? '10rem' : '20rem' }}
        >
          <Box className="grid overflow-hidden md:min-h-[65%]">
            <Image
              src={`http://127.0.0.1:8000${data.data[0].imagem}`}
              alt={data.data[0].imagem}
              sx={{
                marginBottom: '8px',
                objectFit: 'cover',
                height: '100%',
                minHeight: '100%',
                maxHeight: '10rem',
                width: '100%',
                borderRadius: '0.375rem',
                '@media (min-width:768px)': {
                  maxHeight: '100%',
                },
                ...styleImageTransition,
              }}
            />
          </Box>
          <Typography
            fontSize={!isSmallSmartphone ? '1.5rem' : '2rem'}
            fontWeight="600"
            className="text-color-pattern"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              paddingBottom: '0.5rem',
            }}
          >
            {data.data[0].nomeProjeto}
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            {data.data[0].descricao.slice(0, 200)}...
          </Typography>
        </Box>

        <Box
          component="li"
          className="col-column-7-13 lg:col-column-9-13"
          sx={{ minWidth: !isSmallSmartphone ? '10rem' : '20rem' }}
        >
          <Box className="grid overflow-hidden">
            <Image
              src={`http://127.0.0.1:8000${data.data[1].imagem}`}
              alt={data.data[1].imagem}
              sx={{
                marginBottom: '8px',
                objectFit: 'cover',
                height: '100%',
                maxHeight: '10rem',
                width: '100%',
                borderRadius: '0.375rem',
                '@media (min-width:768px)': {
                  maxHeight: '100%',
                },
                minHeight: '10rem',
                ...styleImageTransition,
              }}
            />
          </Box>

          <Typography
            fontSize={!isSmallSmartphone ? '1.5rem' : '2rem'}
            fontWeight="600"
            className="text-color-pattern mb-3"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              paddingBottom: '0.5rem',
            }}
          >
            {data.data[1].nomeProjeto}
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            {data.data[1].descricao.slice(0, 50)}...
          </Typography>
        </Box>

        <Box
          component="li"
          className="col-column-1-7 row-start-4 lg:row-start-2 lg:col-column-9-13"
          sx={{
            minWidth: !isSmallSmartphone ? '10rem' : '20rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box className="grid overflow-hidden" sx={{ height: '100%' }}>
            <Image
              src={`http://127.0.0.1:8000${data.data[2].imagem}`}
              alt={data.data[2].imagem}
              sx={{
                marginBottom: '8px',
                objectFit: 'cover',
                height: '100%',
                maxHeight: '10rem',
                width: '100%',
                borderRadius: '0.375rem',
                '@media (min-width:768px)': {
                  maxHeight: '100%',
                },
                minHeight: '10rem',
                ...styleImageTransition,
              }}
            />
          </Box>

          <Typography
            fontSize={!isSmallSmartphone ? '1.5rem' : '2rem'}
            fontWeight="600"
            className="text-color-pattern mb-3"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              paddingBottom: '0.5rem',
            }}
          >
            {data.data[2].nomeProjeto}
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            {data.data[2].descricao.slice(0, 50)}...
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Projects;

Projects.propTypes = {
  refProject: PropTypes.object,
};
