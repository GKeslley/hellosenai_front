import {
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Accordion from '../../components/Accordion';
import GitHubIcon from '@mui/icons-material/GitHub';
import Comment from '../../components/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import LinkComponent from '../../components/Link';
import { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import CommentActions from '../../components/Comment/CommentActions';
import CommentInput from '../../components/Comment/CommentInput';
import ConstructionIcon from '@mui/icons-material/Construction';
import { UserGlobalContext } from '../../contexts/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from '../Projects/ProjectForm';
import Error from '../Error';
import AvatarUser from '../../components/Avatar';
import RestoreIcon from '@mui/icons-material/Restore';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const Project = () => {
  const { data: dataUser } = useContext(UserGlobalContext);
  const [openComment, setOpenComment] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openReply, setOpenReply] = useState({ isOpen: false, id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const params = useParams();
  const comment = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', params],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/projeto/${params.slug}`, config)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (dataComment) => {
      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${params.slug}/comentario`,
        dataComment,
        config,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'], type: 'active' });
      handleCloseComment();
    },
  });

  const mutationUpdateProject = useMutation({
    mutationFn: (dataProject) => {
      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${params.slug}?_method=PUT`,
        dataProject,
        config,
      );
    },
    onSuccess: (data) => {
      setOpenDialog(false);
      setAnchorEl(false);
      navigate(`/projetos/${data.data.slug}`);
    },
  });

  const mutationDisableProject = useMutation({
    mutationFn: () => {
      return axios.put(
        `http://127.0.0.1:8000/api/v1/projeto/${params.slug}/desativar`,
        null,
        config,
      );
    },
    onSuccess: () => {
      navigate('/projetos');
    },
  });

  const mutationRestoreProject = useMutation({
    mutationFn: () => {
      return axios.put(
        `http://127.0.0.1:8000/api/v1/projeto/${params.slug}/reativar`,
        null,
        config,
      );
    },
    onSuccess: () => {
      navigate('/projetos');
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
    mutation.mutate(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditProject = () => {
    setOpenDialog(true);
  };

  const handleDisableProject = () => {
    if (confirm('Realmente deseja desativar o projeto?') === true) {
      setAnchorEl(false);
      mutationDisableProject.mutate();
    }
  };

  const handleRestoreProject = () => {
    if (confirm('Realmente deseja reativar o projeto?') === true) {
      setAnchorEl(false);
      mutationRestoreProject.mutate();
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error message={error.response.data.message} statusCode={error.response.status} />
    );
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
          }}
        >
          <Title>{data.data.nomeProjeto}</Title>
          {dataUser && data.data.autor.apelido === dataUser.apelido && (
            <Box>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{ gap: '0.5rem' }}
              >
                <MenuItem onClick={handleOpenEditProject} sx={{ gap: '0.5rem' }}>
                  <EditIcon />
                  Editar
                </MenuItem>
                {data.data.status === 1 ? (
                  <>
                    {mutationDisableProject.isLoading ? (
                      <MenuItem sx={{ gap: '0.5rem' }}>
                        <DeleteIcon />
                        Desativando...
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={handleDisableProject} sx={{ gap: '0.5rem' }}>
                        <DeleteIcon />
                        Desativar
                      </MenuItem>
                    )}
                  </>
                ) : (
                  <>
                    {mutationRestoreProject.isLoading ? (
                      <MenuItem sx={{ gap: '0.5rem' }}>
                        <RestoreIcon />
                        Ativando...
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={handleRestoreProject} sx={{ gap: '0.5rem' }}>
                        <RestoreIcon />
                        Ativar
                      </MenuItem>
                    )}
                  </>
                )}
              </Menu>
            </Box>
          )}
        </Box>
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
                {data.data.participantes.map(({ nome, apelido, avatar }) => (
                  <>
                    <LinkComponent to={`/usuario/${apelido}`} animation={false}>
                      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <AvatarUser
                          avatar={avatar}
                          sx={{ width: '30px', height: '30px' }}
                        />
                        {nome}
                      </Box>
                    </LinkComponent>
                  </>
                ))}
              </Box>
            </Box>
          )}

          <Box component="li">
            <Subtitle sx={{ marginBottom: '1rem' }}>Status</Subtitle>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <ConstructionIcon />
              <Typography>{data.data.projetoStatus}</Typography>
            </Box>
          </Box>

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
                {dataUser && (
                  <AvatarUser
                    avatar={dataUser.avatar}
                    sx={{ width: '30px', height: '30px' }}
                  />
                )}
                <CommentInput handleOpenComment={handleOpenComment} input={comment} />
              </Box>
              {openComment && (
                <CommentActions
                  handleCloseComment={handleCloseComment}
                  input={comment}
                  onClick={postNewComment}
                  isLoading={mutation.isLoading}
                />
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
                        config={config}
                        slug={params.slug}
                        queryClient={queryClient}
                      />
                      {resposta && (
                        <Comment
                          id={resposta.idcomentario}
                          text={resposta.texto}
                          date={resposta.criadoEm}
                          user={resposta.usuario}
                          sx={{ margin: '10px 0px 10px 46px' }}
                          isReply={true}
                          config={config}
                          slug={params.slug}
                          queryClient={queryClient}
                        />
                      )}
                    </Box>
                  ),
                )}
            </Box>
          </Box>
        </Box>
      </Container>

      {openDialog && (
        <ProjectForm
          project={{
            name: data.data.nomeProjeto,
            description: data.data.descricao,
            participants: data.data.participantes,
            status: data.data.projetoStatus,
            image: data.data.imagem,
            slug: data.data.slug,
          }}
          setOpenModal={setOpenDialog}
          openModal={openDialog}
          title="Editar Projeto"
          mutation={mutationUpdateProject}
        />
      )}
    </Container>
  );
};

export default Project;
