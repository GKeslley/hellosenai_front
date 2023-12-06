import { Avatar, Box, Container, Divider, Paper, Typography } from "@mui/material";
import thumb from '../../assets/senai-user.jpg'
import NavLinkActive from "../../components/NavLink";

const User = () => {
  return (
  <Box component='section' sx={{display: 'grid', gridTemplateRows: 'auto 1fr'}}>
    <Box sx={{position: 'relative'}}>
      <Box component='figure' sx={{height: '14rem'}}>
        <Box component='img' src={thumb} alt="Logo do Senai" sx={{width: '100%', objectFit: 'cover', height: '100%'}} />
      </Box>
      <Container>
        <Box sx={{display: 'flex', alignItems: 'end', gap: '2rem', position: 'absolute', bottom: '-100px'}}>
          <Avatar sx={{width: '180px', height: '180px'}} />
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '1rem'}}>
            <Typography fontWeight={800} fontSize='2rem'>Kevin Smith</Typography>
            <Typography>Entrou em: 22/05/2023</Typography>
          </Box>
        </Box>
      </Container>
    </Box>

    <Container sx={{display: 'grid', gap: '0.5rem', marginTop: '180px'}}>
      <Divider />
      <Box sx={{display: 'flex', justifyContent: 'center', gap: '0rem 5rem'}}>
        <NavLinkActive background="#000" color="#000" top='-1rem' sx={{fontSize: '1.3rem'}}>Projetos</NavLinkActive>
        <NavLinkActive to='/convites' background="#000" color="#000" top='-1rem' sx={{fontSize: '1.3rem'}}>Convites</NavLinkActive>
      </Box>
    </Container>
  </Box>
  );
};

export default User;
