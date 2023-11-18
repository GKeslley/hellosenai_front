import React from 'react'
import { Avatar, Box, Container, Divider, TextField, Typography } from '@mui/material'
import teste2 from '../../assets/logo2.png';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Accordion from '../../components/Accordion';
import GitHubIcon from '@mui/icons-material/GitHub';
import ButtonComponent from '../../components/Button';
import Comment from '../../components/Comment';

const Project = () => {
  return (
    <Container sx={{marginBottom: '2rem'}}>
      <Box component='img' src={teste2} alt='facebook' 
      sx={{maxHeight: '20rem', objectFit: 'cover', width: '100%', marginBottom: '1.5rem'}} />
      <Container>
        <Title sx={{marginBottom: '3rem'}}>Projeto E-commerce</Title>
        <Box 
        component='ul' 
        sx={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}}>
          <Box component='li'>
            <Subtitle sx={{marginBottom: '1rem'}}>Descrição</Subtitle>
            <Typography sx={{whiteSpace: 'break-spaces'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel laoreet velit, at iaculis nulla. 
              Cras aliquet purus augue, laoreet bibendum tortor malesuada eu. Praesent mi enim, vestibulum
              eu dolor quis, volutpat dapibus velit. Sed sit amet commodo lacus. Morbi rutrum eleifend mollis. 
              Nulla vulputate in nulla non hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Aliquam facilisis congue orci hendrerit congue. Integer placerat ultrices auctor. Nullam arcu 
              eros, mattis quis aliquam vitae, interdum vel mi. Proin at tempor ipsum, at feugiat tellus.
              Donec purus eros, egestas nec finibus nec, tempor a nisl. Nunc lacus mauris, ornare ultricies 
              velit aliquet, ullamcorper commodo felis.
            </Typography>
          </Box>

          <Box component='li'>
            <Subtitle sx={{marginBottom: '1rem'}}>Participantes</Subtitle>
            <Typography>Fulano | www.github.com</Typography>
            <Typography>Fulano | www.github.com</Typography>
            <Typography>Fulano | www.github.com</Typography>
          </Box>

          <Box component='li'>
            <Subtitle sx={{marginBottom: '1rem'}}>Sobre</Subtitle>
            <Box sx={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <GitHubIcon />
              <Typography>www.github.com</Typography>
            </Box>
          </Box>

          <Box component='li'>
            <Subtitle sx={{marginBottom: '1rem'}}>Informações</Subtitle>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <Accordion title='Como Utilizar o Github' idVideo='UbJLOn1PAKw' />
              <Accordion title='Github Para Clonar Repositórios' idVideo='OlArEishhQg' />
            </Box>
          </Box>

          <Divider />

          <Box component='li'>
            <Subtitle sx={{marginBottom: '1rem'}}>Comentários</Subtitle>
            <Box sx={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem'}}>
              <Avatar sx={{width: '30px', height: '30px'}} />
              <TextField placeholder='Deixe um comentário...' sx={{flexGrow: '1', minWidth: '1rem'}} />
            </Box>

            <Box component='ul' sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Comment />
                <Comment />
            </Box>
          </Box>

        </Box>
      </Container>
    </Container>
  )
}

export default Project