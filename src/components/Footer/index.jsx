import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const footerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'rem' : '2fr 1fr 1fr',
    gap: '1.25rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    alignItems: 'stretch',
    textAlign: isMobile ? 'center' : '',
    justifyContent: isMobile ? 'center' : '',
  };

  return (
    <footer className="bg-[#2E7BEF] grid h-full text-white mt-10">
      <Container sx={footerStyle} className="md:grid-columns-1">
        <Box
          sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
          className="gap-9 w-full"
        >
          <div>
            <Typography>Hello Senai</Typography>
          </div>

          <div className="grid grid-rows-footer">
            <Typography
              variant="body1"
              fontSize="1.25rem"
              fontWeight="600"
              className="font-bold"
            >
              Contatos
            </Typography>
            <ul className="text-white">
              <li className="flex flex-col gap-y-2">
                <Typography>guilherme.k.santos@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography>juliana.m@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography>lucas.rabelo@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography>luiz.h@ba.estudante.senai.br</Typography>
              </li>
            </ul>
          </div>
        </Box>

        <div className="grid w-full justify-center grid-rows-footer">
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="600"
            className="font-bold"
          >
            Serviços
          </Typography>
          <ul className="flex flex-col gap-y-2">
            <li>
              <NavLink to="/projetos" className=" text-white">
                Projetos
              </NavLink>
            </li>
            <li>
              <NavLink to="/convites" className=" text-white">
                Convites
              </NavLink>
            </li>
            <li>
              <NavLink to="/desafios" className=" text-white">
                Desafios
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="grid w-full justify-center grid-rows-footer">
          <Typography
            variant="body1"
            fontSize="1.25rem"
            fontWeight="600"
            className="font-bold"
          >
            Links Rápidos
          </Typography>
          <ul className="flex flex-col gap-y-2">
            <li className="flex flex-col gap-y-2">
              <Link to="/documentacao">Documentação</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/github">Github</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
