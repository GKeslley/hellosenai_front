import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useQuery } from 'react-query';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'texto', headerName: 'Texto', width: 200 },
  { field: 'projeto', headerName: 'Projeto', width: 200 },
  {
    field: 'criada_em',
    headerName: 'Data Criação',
    width: 200,
  },
  {
    headerName: 'Visualizar',
    width: 300,
    // Define a custom render function for the cell
    renderCell: (params) => {
      const row = params.row;
      const handleClick = () => {
        alert(`You clicked on row ${row}`);
      };
      return (
        <Button onClick={handleClick} variant="contained" size="small">
          Visualizar
        </Button>
      );
    },
  },
];

const Denounces = () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading, error } = useQuery('denounces', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/denuncia', config)
      .then((response) => response.data);
  });

  console.log(data);

  return (
    <>
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
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default Denounces;
