import { Avatar, Box, Button, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody } from '@mui/material';
import teacherImage from '../../assets/login/pvta.png';
import warningImage from '../../assets/teste2.png';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ModalComponent from '../../components/Modal';

const Adm = () => {
  const [openModal, setOpenModal] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['invalidTeachers'],
    queryFn: () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      return axios.get(`http://127.0.0.1:8000/api/v1/professores/invalidos`, config);
    },
    refetchOnWindowFocus: false,
  });


  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <Title>Tela do Administrador</Title>
      <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
          onClick={() => setOpenModal(true)}
        >
          <Avatar
            src={teacherImage}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Novo Professor
          </Typography>
        </Paper>

        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1rem',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: { xs: '15rem', sm: '15rem' },
            maxWidth: { xs: '15rem', sm: '15rem' },
          }}
          component={Link}
          to="/usuario/adm/denuncias"
        >
          <Avatar
            src={warningImage}
            sx={{
              objectPosition: 'top',
              width: '90px',
              height: '90px',
              '& .MuiAvatar-img': {
                objectPosition: 'top',
              },
            }}
          />
          <Typography fontSize="1.5rem" fontWeight="500">
            Denúncias
          </Typography>
        </Paper>
      </Box>

      {openModal && data && 
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
        <TableContainer>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.data.map(({nome, email}) => 
                <TableRow key={email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                      {nome}
                  </TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">
                    <Button variant='outlined'>Autorizar</Button>
                  </TableCell>             
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        </ModalComponent>}
    </Container>
  );
};

export default Adm;
