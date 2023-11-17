import { useState } from 'react';
import MenuHeader from './Menu/index';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MenuMobile from './MenuMobile';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinkActive from '../NavLink/index';
import { Box, Paper, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/header/logo.png'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const screenIsMobile = useMediaQuery('(max-width: 40rem)');
  const screenIsMobile960 = useMediaQuery('(max-width: 960px)');

  const isOutOfHome = useLocation().pathname.slice(0, -1).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      component="header"
      className={`bg-gradient-to-r from-blue-header to-blue-600 ${!isOutOfHome ? 'h-80 mb-44' : 'h-auto mb-8'} relative`}
    >
      <div
        className={`bg-center bg-fixed bg-no-repeat bg-cover ${
          isOutOfHome ? 'auto' : 'h-96'
        } grid ${isOutOfHome ? '' : 'grid-rows-auto2'} gap-12`}
      >
        <div className="flex flex-1 flex-wrap justify-between h-max items-center p-8">
          <Box component='img' src={Logo} alt="Logo Hello Senai" className='max-w-[5rem]' />
          <nav>
            <ul className="flex gap-6 items-center">
              {!screenIsMobile && (
                <>
                  <li>
                    <NavLinkActive to="/projetos" className="font-semibold text-white">
                      Projetos
                    </NavLinkActive>
                  </li>
                  <li>
                    <NavLinkActive to="/convites" className="font-semibold text-white">
                      Convites
                    </NavLinkActive>
                  </li>
                  <li>
                    <NavLinkActive to="/desafios" className="font-semibold text-white">
                      Desafios
                    </NavLinkActive>
                  </li>
                </>
              )}
              <li>
                <Tooltip title="Configurações do Usuário">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {!screenIsMobile ? 'M' : <MenuIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
            {!screenIsMobile ? (
              <MenuHeader anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            ) : (
              <MenuMobile anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            )}
          </nav>
        </div>

        {!isOutOfHome && (
          <Box className="grid justify-items-center">
            <Box className="grid grid-cols-auto-columns-2 text-c text-[#2E7BEF] gap-0 px-8 
            absolute -bottom-32 justify-center min-[950px]:grid-cols-autoColumns min-[950px]:gap-3 max-[950px]:min-w-full">
              <Paper
                className="bg-gradient-to-l from-[#2E7BEF] to-blue-600 h-80 w-8 min-[950px]:w-full
                max-[320px]:w-3"
                elevation={3}
                sx={{borderRadius: screenIsMobile960 ? '4px 0 0 4px' : '4px'}}
              >
                <Box
                  className="bg-none bg-center bg-no-repeat bg-contain p-8 
                  h-full w-full min-[950px]:w-[32rem] min-[950px]:bg-[url('assets/test.png')]"
                  sx={{ backgroundColor: 'transparent' }}
                ></Box>
              </Paper>

              <Paper
                className="flex flex-col p-8 gap-2 bg-white"
                elevation={3}
                sx={{borderRadius: screenIsMobile960 ? '0 4px 4px 0' : '4px'}}
              >
                <Typography 
                fontSize='0.8rem' 
                sx={{fontWeight: 'bold', marginBottom: '1rem'}}
                className='text-white bg-color-pattern-100 max-w-max p-1'>
                  Hello Senai
                </Typography>

                <Typography
                  variant="p"
                  fontWeight="800"
                  className="text-2xl font-bold min-[960px]:text-4xl"
                >
                  Bem Vindo
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="500"
                  className="text-base opacity-70 leading-6 min-[960px]:text-xl"
                  sx={{maxWidth: '35ch'}}
                >
                  Conectando Alunos, Expandindo Horizontes: O Seu Espaço de Interatividade e Network!
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Header;
