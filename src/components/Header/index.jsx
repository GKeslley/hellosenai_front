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

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const screenIsMobile = useMediaQuery('(max-width: 40rem)');

  const isOutOfHome = useLocation().pathname.slice(0, -1).length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      component="header"
      className="bg-gradient-to-r from-blue-header to-blue-600 mb-44 h-80 relative"
    >
      <div
        className={`bg-center bg-fixed bg-no-repeat bg-cover ${
          isOutOfHome ? 'auto' : 'h-96'
        } grid ${isOutOfHome ? '' : 'grid-rows-auto2'} gap-12`}
      >
        <div className="flex flex-1 flex-wrap justify-between h-max items-center p-8">
          <h1 className="font-semibold text-white">Hello Senai</h1>
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
            <Box className="grid grid-cols-autoColumns text-c text-[#2E7BEF] gap-3 px-8 absolute -bottom-32 justify-center">
              <Paper
                className="bg-gradient-to-l from-[#2E7BEF] to-blue-600 h-80"
                elevation={3}
              >
                <Box
                  className="bg-[url('assets/test.png')] bg-center bg-no-repeat bg-contain p-8 h-full w-[32rem] w-"
                  sx={{ backgroundColor: 'transparent' }}
                ></Box>
              </Paper>

              <Paper
                className="flex text-center flex-col pb-8 gap-2 bg-white"
                elevation={3}
              >
                <Typography
                  variant="h2"
                  fontWeight="800"
                  fontSize="4rem"
                  className="font-bold"
                >
                  Bem Vindo
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="500"
                  fontSize="1.2rem"
                  className="opacity-70"
                >
                  Criar, Compartilhar & Interagir
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
