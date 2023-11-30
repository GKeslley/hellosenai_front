import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/header/logo.png'

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 830px)');
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const footerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
    padding: '2rem',
    alignItems: 'stretch',
    textAlign: isMobile ? 'center' : '',
    justifyContent: isMobile ? 'center' : 'space-between',
    flexDirection: isMobile ? 'column' : 'row'
  };

  return (
    <Box component='footer' className="bg-[#2E7BEF] grid h-full text-white">
      <Box sx={footerStyle} className="md:grid-columns-1">
        <Box
          sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1rem' : '5rem' }}
          className="gap-5 md:gap-20"
        >
          <Box className="grid justify-center">
            <Box component='img' src={Logo} alt="Logo Hello Senai" className='max-w-[5rem]' />
          </Box>

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
                <Typography sx={{wordBreak: 'break-word'}}>guilherme.k.santos@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography sx={{wordBreak: 'break-word'}}>juliana.m@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography sx={{wordBreak: 'break-word'}}>lucas.rabelo@ba.estudante.senai.br</Typography>
              </li>
              <li>
                <Typography sx={{wordBreak: 'break-word'}}>luiz.h@ba.estudante.senai.br</Typography>
              </li>
            </ul>
          </div>
        </Box>

        <div className="grid justify-center grid-rows-footer">
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

        <div className="grid justify-center grid-rows-footer">
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
      </Box>
    </Box>
  );
};

export default Footer;
