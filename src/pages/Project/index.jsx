import { Avatar, Box, Container, Divider, TextField, Typography } from '@mui/material';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Accordion from '../../components/Accordion';
import GitHubIcon from '@mui/icons-material/GitHub';
import Comment from '../../components/Comment';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import LinkComponent from '../../components/Link';

const Project = () => {
  const params = useParams();

  const { data, isLoading, error } = useQuery('project', () => {
    return axios
      .get(`http://127.0.0.1:8000/api/v1/projeto/${params.slug}`)
      .then((response) => response.data);
  });

  console.log(data);

  if (isLoading) return <Loading />;
  if (error) return null;
  return (
    <Container sx={{ marginBottom: '2rem', marginTop: '2rem' }}>
      <Box
        component="img"
        src={`http://127.0.0.1:8000${data.data.imagem}`}
        alt="facebook"
        sx={{
          maxHeight: '20rem',
          objectFit: 'cover',
          width: '100%',
          marginBottom: '1.5rem',
        }}
      />
      <Container>
        <Title sx={{ marginBottom: '3rem' }}>{data.data.nomeProjeto}</Title>
        <Box
          component="ul"
          sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
        >
          <Box component="li">
            <Subtitle sx={{ marginBottom: '1rem' }}>Descrição</Subtitle>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{data.data.descricao}</Typography>
          </Box>

          {data.data.participantes.length > 0 && (
            <Box component="li">
              <Subtitle sx={{ marginBottom: '1rem' }}>Participantes</Subtitle>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.data.participantes.map(({ nome, apelido }) => (
                  <>
                    <LinkComponent to={`/usuario/${apelido}`} animation={false}>
                      {nome}
                    </LinkComponent>
                  </>
                ))}
              </Box>
            </Box>
          )}

          <Box component="li">
            <Subtitle sx={{ marginBottom: '1rem' }}>Sobre</Subtitle>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <GitHubIcon />
              <Typography>www.github.com</Typography>
            </Box>
          </Box>

          <Box component="li">
            <Subtitle sx={{ marginBottom: '1rem' }}>Informações</Subtitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Accordion title="Como Utilizar o Github" idVideo="UbJLOn1PAKw" />
              <Accordion title="Github Para Clonar Repositórios" idVideo="OlArEishhQg" />
            </Box>
          </Box>

          <Divider />

          <Box component="li">
            <Subtitle sx={{ marginBottom: '1rem' }}>Comentários</Subtitle>
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
              }}
            >
              <Avatar sx={{ width: '30px', height: '30px' }} />
              <TextField
                placeholder="Deixe um comentário..."
                sx={{ flexGrow: '1', minWidth: '1rem' }}
              />
            </Box>

            <Box
              component="ul"
              sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <Comment />
              <Comment />
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Project;
