import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Container,
} from '@mui/material';
import Loading from '../../components/Helper/Loading';
import Subtitle from '../../components/Subtitle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ButtonComponent from '../../components/Button';
import { useContext, useState } from 'react';
import Error from '../Error';
import { UserGlobalContext } from '../../contexts/UserContext';

const Teachers = () => {
  const { data: dataUser, isLoading: loadingUser } = useContext(UserGlobalContext);
  const [id, setId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['invalidTeachers'],
    queryFn: () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      return axios.get(`http://127.0.0.1:8000/api/v1/professores/invalidos`, config);
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.put(`http://127.0.0.1:8000/api/v1/professor/autenticar`, data, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invalidTeachers'], type: 'active' });
    },
  });

  const authorizeTeacher = (email, i) => {
    const token = localStorage.getItem('token');
    setId(i);
    mutation.mutate({ data: email, token });
  };

  if (loadingUser) return <Loading />;
  if (dataUser && dataUser.permissao !== 'adm')
    return <Error message="Autorização negada" statusCode="401" />;
  if (isLoading) return <Loading />;
  return (
    <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Subtitle>
        Professores Pendentes
        <MenuBookIcon sx={{ width: '30px', height: '30px', marginLeft: '0.25rem' }} />
      </Subtitle>

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
            {data.data.data.map(({ nome, email }, i) => (
              <TableRow
                key={email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {nome}
                </TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">
                  <ButtonComponent
                    variant="outlined"
                    isLoading={id === i && mutation.isLoading}
                    onClick={() => authorizeTeacher(email, i)}
                  >
                    Autorizar
                  </ButtonComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Teachers;
