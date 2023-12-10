import { Button, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useQuery } from 'react-query';
import Subtitle from '../Subtitle';
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'texto', headerName: 'Texto', width: 500 },
  { field: 'projeto', headerName: 'Projeto', width: 250 },
  {
    field: 'criada_em',
    headerName: 'Data Criação',
    width: 150,
  },
];

const Denounces = () => {
  const [denounce, setDenounce] = useState(null);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  columns[4] = {
    headerName: 'Visualizar',
    width: 200,
    // Define a custom render function for the cell
    renderCell: (params) => {
      const row = params.row;
      const handleClick = () => {
        setDenounce(row);
      };
      return (
        <Button onClick={handleClick} variant="contained" size="small">
          Visualizar
        </Button>
      );
    },
  };

  console.log(denounce);

  const { data, isLoading, error } = useQuery('denounces', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/denuncia', config)
      .then((response) => response.data);
  });

  console.log(data);

  return (
    <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Subtitle>
        Denúncias Recentes
        <WarningIcon sx={{ width: '30px', height: '30px', marginLeft: '0.25rem' }} />
      </Subtitle>
      {data && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data.data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: data.data.length },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      )}
    </Container>
  );
};

export default Denounces;
