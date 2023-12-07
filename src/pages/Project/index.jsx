import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Accordion from '../../components/Accordion';
import GitHubIcon from '@mui/icons-material/GitHub';
import Comment from '../../components/Comment';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import LinkComponent from '../../components/Link';
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import CommentActions from '../../components/Comment/CommentActions';
import CommentInput from '../../components/Comment/CommentInput';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const Project = () => {
  const [openComment, setOpenComment] = useState(false);
  const [openReply, setOpenReply] = useState({ isOpen: false, id: null });
  const params = useParams();
  const comment = useForm();

  const { data, isLoading, error } = useQuery('project', () => {
    return axios
      .get(`http://127.0.0.1:8000/api/v1/projeto/${params.slug}`)
      .then((response) => response.data);
  });

  const mutation = useMutation({
    mutationFn: (dataComment) => {
      return axios.post(
        `http://127.0.0.1:8000/api/v1/${params.slug}/comentario`,
        dataComment,
        config,
      );
    },
    onSuccess: () => {
      handleCloseComment();
    },
  });

  const handleOpenComment = () => setOpenComment(true);

  const handleCloseComment = () => {
    comment.setValue('');
    setOpenComment(false);
  };

  const postNewComment = () => {
    const data = {
      texto: comment.value,
    };
    if (openReply.id) data.comentarioPai = openReply.id;
    mutation.mutate(data);
  };

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
                flexDirection: 'column',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <Avatar sx={{ width: '30px', height: '30px' }} />
                <CommentInput handleOpenComment={handleOpenComment} input={comment} />
              </Box>
              {openComment && (
                <CommentActions handleCloseComment={handleCloseComment} input={comment} />
              )}
            </Box>

            <Box
              component="ul"
              sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {data.data.comentarios.length > 0 &&
                data.data.comentarios.map(
                  ({ idcomentario, criadoEm, resposta, texto, usuario }) => (
                    <Box
                      key={idcomentario}
                      sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    >
                      <Comment
                        id={idcomentario}
                        text={texto}
                        date={criadoEm}
                        user={usuario}
                        openReply={openReply}
                        setOpenReply={setOpenReply}
                      />
                      {resposta && (
                        <Comment
                          id={resposta.idcomentario}
                          text={resposta.texto}
                          date={resposta.criadoEm}
                          user={resposta.usuario}
                          sx={{ margin: '10px 0px 10px 46px' }}
                          isReply={true}
                        />
                      )}
                    </Box>
                  ),
                )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Project;
