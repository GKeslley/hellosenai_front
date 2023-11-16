import Typography from '@mui/material/Typography';
import Subtitle from '../../Subtitle';
import teste from '../../../assets/logo.png';
import teste2 from '../../../assets/logo2.png';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

const Projects = ({ refProject }) => {
  const styleImageTransition = {
    transition: 'transform .5s ease',
    ':hover': { transform: 'scale(1.03)' },
  };

  return (
    <Container ref={refProject}>
      <Subtitle>Projetos Recentes</Subtitle>
      <Box className="flex flex-col gap-8 md:grid md:grid-cols-projects">
        <li className="min-w-[20rem] row-span-3 col-column-1-13 h-full lg:col-column-1-9">
          <Box className="grid overflow-hidden md:min-h-[65%]">
            <Box
              component="img"
              src={teste}
              alt="teste"
              className="mb-2 object-cover h-full min-h-full max-h-40 min-w-full rounded-md md:max-h-full"
              sx={styleImageTransition}
            />
          </Box>
          <Typography
            fontSize="2rem"
            fontWeight="600"
            marginBottom="0.325rem"
            className="text-color-pattern mb-3"
          >
            Projeto e-commerce
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel
            laoreet...
          </Typography>
        </li>

        <li className="min-w-[20rem] col-column-7-13 lg:col-column-9-13">
          <Box className="grid overflow-hidden">
            <Box
              component="img"
              src={teste2}
              alt="teste"
              className="mb-2 object-cover min-h-[10rem] max-h-40 rounded-md min-w-full"
              sx={styleImageTransition}
            />
          </Box>

          <Typography
            fontSize="2rem"
            fontWeight="600"
            marginBottom="0.325rem"
            className="text-color-pattern mb-3"
          >
            Projeto dots
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel
            laoreet...
          </Typography>
        </li>

        <li className="min-w-[20rem] col-column-1-7 row-start-4 lg:row-start-2 lg:col-column-9-13">
          <Box className="grid overflow-hidden">
            <Box
              component="img"
              src={teste}
              alt="teste"
              className="mb-2 object-cover min-h-[10rem] rounded-md max-h-40 min-w-full"
              sx={styleImageTransition}
            />
          </Box>

          <Typography
            fontSize="2rem"
            fontWeight="600"
            marginBottom="0.325rem"
            className="text-color-pattern mb-3"
          >
            Criação game
          </Typography>
          <Typography fontWeight="300" className="text-color-pattern-400">
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel
            laoreet...
          </Typography>
        </li>
      </Box>
    </Container>
  );
};

export default Projects;

Projects.propTypes = {
  refProject: PropTypes.object,
};
