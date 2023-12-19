import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Loading from '../../../components/Helper/Loading';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useParams } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ChallengesPerfomed = () => {
  const [expanded, setExpanded] = useState([]);
  const params = useParams();

  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading } = useQuery(
    'challengesPerfomed',
    () => {
      return axios
        .get(
          `http://127.0.0.1:8000/api/v1/usuario/desafios/realizados?teacher=${params.user}`,
          config,
        )
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <Loading />;
  return (
    <Container
      component="ul"
      sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      {data &&
        data.data.map(({ desafio, projeto }, index) => (
          <Paper
            key={desafio.slug}
            elevation={expanded[index] ? 3 : 0}
            sx={{ borderRadius: '4px' }}
          >
            <MenuItem
              sx={{ display: 'flex', flexDirection: 'column', padding: '8px 16px' }}
            >
              <Box
                sx={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%' }}
              >
                <Box
                  component="figure"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(66,133,244)',
                    borderRadius: '50%',
                    width: '2.25rem',
                    height: '2.25rem',
                  }}
                >
                  <AssignmentIcon sx={{ fill: '#fff' }} />
                </Box>
                <Typography
                  textTransform="uppercase"
                  fontSize="0.875rem"
                  fontWeight="500"
                >
                  {desafio.titulo}
                </Typography>
                <ExpandMore
                  expand={expanded[index]}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded[index]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Box>
            </MenuItem>
            {expanded[index] && (
              <Divider
                sx={{ '&.MuiDivider-root': { marginTop: '0', marginBottom: '0' } }}
              />
            )}
            {expanded[index] && (
              <>
                <Collapse
                  in={expanded[index]}
                  timeout="auto"
                  unmountOnExit
                  component={Container}
                  sx={{ maxHeight: '40vh', overflow: 'auto' }}
                >
                  <Box sx={{ paddingTop: '0.5', paddingBottom: '0.5' }}>
                    <Typography sx={{ whiteSpace: 'pre-wrap', padding: '0.5rem 0' }}>
                      {desafio.descricao}
                    </Typography>
                  </Box>
                </Collapse>
                {expanded[index] && (
                  <>
                    <Divider />
                    <Box component={Container} sx={{ padding: '0.5rem' }}>
                      <Button component={Link} to={`/projetos/${projeto.slug}`}>
                        Conferir Projeto
                      </Button>
                    </Box>
                  </>
                )}
              </>
            )}
          </Paper>
        ))}
    </Container>
  );
};

export default ChallengesPerfomed;
