import { useState } from 'react';
import MenuHeader from './Menu/index';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import useMedia from '../../hooks/useMedia';
import MenuMobile from './MenuMobile';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinkActive from '../NavLink/index';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const screenIsMobile = useMedia('(max-width: 40rem)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <header className="bg-[#2E7BEF] mb-10">
      <div className="bg-[url('assets/header/headerImage.png')] bg-center bg-fixed bg-no-repeat bg-cover h-96 grid grid-rows-2">
        <div className="flex flex-1 px-8 flex-wrap justify-between py-6 h-max items-center">
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

        <div className="flex text-center flex-col pb-8 gap-2">
          <Typography variant="h2" fontWeight='800' fontSize='4rem' className="text-white font-bold">
            Bem Vindo
          </Typography>
          <Typography variant="p" fontWeight='500' fontSize="1.2rem" className="opacity-70 text-white">
            Criar, Compartilhar & Interagir
          </Typography>
        </div>
      </div>
    </header>
  );
};

export default Header;
