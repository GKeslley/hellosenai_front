import Typography from '@mui/material/Typography';
import Subtitle from '../../Subtitle';
import teste from '../../../assets/logo.png';
import teste2 from '../../../assets/logo2.png';
import { Container } from '@mui/material';

const Projects = () => {
  return (
    <Container>
      <Subtitle sx={{ marginBottom: '2.5rem' }}>
        Projetos Publicados Recentemente
      </Subtitle>
      <ul className="flex gap-10 flex-wrap">
        <li className="min-w-[20rem] flex-1">
          <img
            src={teste}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Projeto e-commerce
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>

        <li className="min-w-[20rem] flex-1">
          <img
            src={teste2}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Projeto dots
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>

        <li className="min-w-[20rem] flex-1">
          <img
            src={teste}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Criação game
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>

        <li className="min-w-[20rem] flex-1">
          <img
            src={teste}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Projeto e-commerce
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>
        {/* ------------ -----------------------------------------------*/}
        <li className="min-w-[20rem] flex-1">
          <img
            src={teste2}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Projeto dots
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>

        <li className="min-w-[20rem] flex-1">
          <img
            src={teste}
            alt="teste"
            className="mb-2 object-cover min-h-[10rem] max-h-40 min-w-full"
          />
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="500"
            marginBottom="0.625rem"
            className="text-stone-500 font-bold mb-3"
          >
            Criação game
          </Typography>
          <Typography
            variant="body1"
            fontWeight="300"
            className="text-stone-400 font-bold"
          >
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibe ndum tortor
            malesuada eu.
          </Typography>
        </li>
      </ul>
    </Container>
  );
};

export default Projects;
