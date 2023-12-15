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

const Challenge = () => {
  const params = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data, isLoading } = useQuery({
    queryKey: ['challenge'],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/desafio/${params.slug}`)
        .then((response) => response.data);
    },
  });

  if (isLoading) return <Loading />;
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
    </Container>
  );
};

export default Challenge;
