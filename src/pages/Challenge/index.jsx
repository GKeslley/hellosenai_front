import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Helper/Loading';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Error from '../Error';

const Challenge = () => {
  const [openImage, setOpenImage] = useState(false);
  const params = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, isLoading, error } = useQuery({
    queryKey: ['challenge', params],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/desafio/${params.slug}`)
        .then((response) => response.data);
    },
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error message={error.response.data.message} statusCode={error.response.status} />
    );
  return (
    <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      {data && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
            gap: '2rem',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
              <Box
                component="figure"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgb(95,99,104)',
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  minWidth: '2.5rem',
                }}
              >
                <AssignmentIcon sx={{ fill: '#fff' }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight={400} fontSize="1.75rem">
                  {data.data.desafio.titulo}
                </Typography>
                <Typography fontWeight={400}>{data.data.autor.nome}</Typography>
              </Box>
            </Box>
            <Divider sx={{ margin: '1rem 0' }} />
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {data.data.desafio.descricao}
            </Typography>

            {data.data.desafio.imagem && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  borderRadius: '0.5rem',
                  maxWidth: 'max-content',
                  width: 'calc(50% - 0.75rem)',
                  marginTop: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => setOpenImage(true)}
              >
                <Box component="figure" sx={{ height: '4.375rem', width: '6.5625rem' }}>
                  <Box
                    component="img"
                    src={`http://127.0.0.1:8000${data.data.desafio.imagem}`}
                    alt={data.data.desafio.imagem}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                    }}
                  />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Typography sx={{ padding: '0 5rem 0 1rem' }}>Anexo</Typography>
              </Box>
            )}
          </Box>

          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              gap: '0.5rem',
              height: 'max-content',
            }}
          >
            <Typography fontSize="1.375rem">Realizar desafio</Typography>
            <Button
              component={Link}
              to={`/projetos?desafio=${data.data.desafio.slug}`}
              variant="outlined"
              sx={{ width: '100%' }}
            >
              Realizar
            </Button>
          </Paper>
        </Box>
      )}

      {openImage && (
        <Dialog onClose={() => setOpenImage(false)} open={openImage}>
          <Box
            component="img"
            src={`http://127.0.0.1:8000${data.data.desafio.imagem}`}
            alt={data.data.desafio.imagem}
          />
        </Dialog>
      )}
    </Container>
  );
};

export default Challenge;
