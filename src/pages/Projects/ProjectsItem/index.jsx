import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  ListItem,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import Loading from '../../../components/Helper/Loading';
import Options from '../../../components/Options';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PropTypes from 'prop-types';
import AvatarUser from '../../../components/Avatar';
import ModalComponent from '../../../components/Modal';
import Input from '../../../components/Form/Input';
import ButtonComponent from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import Image from '../../../components/Helper/Image';

const ProjectsItem = ({
  params,
  url,
  page,
  infinite,
  setInfinite,
  queryClient,
  setOpenSnackbar,
}) => {
  const [slugProject, setSlugProject] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const text = useForm(true);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', params, page],
    queryFn: () => {
      return axios.get(`${url}&page=${page}`).then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${slugProject}/denuncia`,
        data,
        config,
      );
    },
    onSuccess: ({ data }) => {
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
      setOpenDialog(false);
      setAnchorEl(null);
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const mutationDisableProject = useMutation({
    mutationFn: ({ slug, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.put(
        `http://127.0.0.1:8000/api/v1/projeto/${slug}/desativar`,
        null,
        config,
      );
    },
    onSuccess: ({ data }) => {
      setOpenSnackbar({ open: true, message: data.message, severity: 'success' });
      queryClient.invalidateQueries({ queryKey: ['projects'], type: 'active' });
    },
    onError: (error) => {
      setOpenSnackbar({
        open: true,
        message: error.response.data.message,
        severity: 'error',
      });
    },
  });

  const report = () => {
    if (slugProject && text.validate()) {
      const data = {
        texto: text.value,
      };
      const token = localStorage.getItem('token');
      mutation.mutate({ data, token });
    }
  };

  useEffect(() => {
    if (infinite && data && !data.links.next) {
      setInfinite(false);
    }
  }, [infinite, data, setInfinite]);

  const getSlugProject = (slugProject) => {
    setSlugProject(slugProject);
    return slugProject;
  };

  if (isLoading) return <Loading />;
  return (
    <Box>
      {data &&
        data.data.map(({ nomeProjeto, dataCriacao, slug, imagem, autor }, i) => (
          <Box key={slug}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '14px 16px',
                maxWidth: '100%',
              }}
              elevation={0}
              component="li"
            >
              <Box sx={{ display: 'flex', position: 'relative', marginTop: '1.5rem' }}>
                <AvatarUser
                  avatar={autor.avatar}
                  sx={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                  }}
                />

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: '0 0 0 59px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                      gap: '0.4rem',
                    }}
                  >
                    <Typography
                      fontWeight="800"
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginRight: '5px',
                        marginTop: '0.125rem',
                      }}
                    >
                      {autor.nome}
                    </Typography>

                    <Typography
                      component={Link}
                      to={`/usuario/${autor.apelido}`}
                      className="text-gray-400"
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      @{autor.apelido}
                    </Typography>

                    <Typography
                      component="span"
                      fontSize="0.5rem"
                      className="bg-gray-400 h-1 w-1 rounded-full mx-2"
                    ></Typography>

                    <Typography
                      component="time"
                      fontSize="0.9rem"
                      className="text-gray-400"
                    >
                      {dataCriacao}
                    </Typography>

                    <Options
                      sx={{
                        flexGrow: '1',
                        textAlign: 'end',
                        '& .MuiButtonBase-root': {
                          padding: '0',
                        },
                      }}
                      getSlugProject={() => getSlugProject(slug)}
                      setSlugProject={setSlugProject}
                      author={autor.apelido}
                      mutationDisableProject={mutationDisableProject}
                      setAnchorEl={setAnchorEl}
                      anchorEl={anchorEl}
                      setOpenDialog={setOpenDialog}
                      setId={() => setId(i)}
                      id={id === i}
                    />
                  </Box>

                  <Typography fontSize="1rem">{nomeProjeto}</Typography>

                  <Link to={`/projetos/${slug}`}>
                    <Box
                      component="figure"
                      sx={{
                        height: 'min(285px, max(175px, 41vw))',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Image
                        src={`http://127.0.0.1:8000${imagem}`}
                        alt={imagem}
                        sx={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          borderRadius: '6px',
                        }}
                      />
                    </Box>

                    <Box className="flex items-center justify-between gap-5">
                      <Chip icon={<ChatBubbleIcon />} label="5" />
                    </Box>
                  </Link>
                </CardContent>
              </Box>
            </Card>
            <Divider variant="middle" />
          </Box>
        ))}

      {openDialog && (
        <ModalComponent setOpenModal={setOpenDialog} openModal={openDialog}>
          <ListItem>
            <Typography variant="h4" fontWeight="500">
              Denunciar Projeto
            </Typography>
          </ListItem>

          <ListItem
            sx={{
              display: 'flex',
              gap: '0.5rem',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Typography>Motivo da denúncia:</Typography>
            <Input
              required={true}
              fullWidth={true}
              label="Denúncia"
              onChange={text.onChange}
              value={text.value}
              onBlur={text.onBlur}
              multiline
              minRows={5}
            />
            <ButtonComponent
              sx={{ alignSelf: 'end' }}
              onClick={report}
              isLoading={mutation.isLoading}
            >
              Denunciar
            </ButtonComponent>
          </ListItem>
        </ModalComponent>
      )}
    </Box>
  );
};

ProjectsItem.propTypes = {
  params: PropTypes.object,
  url: PropTypes.string,
  page: PropTypes.number,
  infinite: PropTypes.bool,
  setInfinite: PropTypes.func,
  queryClient: PropTypes.object,
  setOpenSnackbar: PropTypes.func,
};

export default ProjectsItem;
