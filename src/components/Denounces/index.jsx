import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';

import axios from 'axios';
import { useQuery } from 'react-query';
import Subtitle from '../Subtitle';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';
import ModalComponent from '../Modal';
import { Link } from 'react-router-dom';
import Loading from '../Helper/Loading';
import ButtonComponent from '../Button';

const Denounces = () => {
  const [openModal, setOpenModal] = useState(false);
  const [denounce, setDenounce] = useState(null);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading } = useQuery('denounces', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/denuncia', config)
      .then((response) => response.data);
  });

  const visualiseDenounce = (data) => {
    setDenounce(data);
    setOpenModal(true);
  };

  if (isLoading) return <Loading />;
  return (
    <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Subtitle>
        Denúncias Recentes
        <WarningIcon sx={{ width: '30px', height: '30px', marginLeft: '0.25rem' }} />
      </Subtitle>
      <TableContainer>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Projeto</TableCell>
              <TableCell align="right">Data Criação</TableCell>
              <TableCell align="right">Visualizar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map(({ id, texto, projeto, criada_em }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{projeto}</TableCell>
                <TableCell align="right">{criada_em}</TableCell>
                <TableCell align="right">
                  <ButtonComponent
                    variant="outlined"
                    onClick={() => visualiseDenounce({ id, texto, projeto, criada_em })}
                  >
                    Visualizar
                  </ButtonComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {denounce && (
        <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              gap: '1rem',
            }}
          >
            <Typography fontSize="1.5rem">
              Denúncia feita em {denounce.criada_em}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Typography
                sx={{
                  maxWidth: 'max-content',
                  whiteSpace: 'break-spaces',
                  wordBreak: 'break-word',
                }}
              >
                Denúncia: {denounce.texto}
              </Typography>
            </Box>
            <Box
              component={Link}
              to={`/projetos/${denounce.projeto}`}
              sx={{ textDecoration: 'underline', width: 'max-content' }}
            >
              Visualizar Projeto
            </Box>
          </Box>
        </ModalComponent>
      )}
    </Container>
  );
};

export default Denounces;
