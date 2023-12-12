import { Avatar, Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../../../components/Helper/Loading';
import Options from '../../../components/Options';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PropTypes from 'prop-types';

const ProjectsItem = ({ params, url, page, infinite, setInfinite, queryClient }) => {
  const [slugProject, setSlugProject] = useState(null);

  console.log(page);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', params, page],
    queryFn: () => {
      return axios.get(`${url}&page=${page}`).then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  if (infinite && data && !data.links.next) {
    setInfinite(false);
  }

  const getSlugProject = (slugProject) => {
    setSlugProject(slugProject);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      {data &&
        data.data.map(({ nomeProjeto, dataCriacao, slug, imagem, autor }) => (
          <>
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
                <Avatar
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
                      sx={{ flexGrow: '1', textAlign: 'end' }}
                      slugProject={slugProject}
                      getSlugProject={() => getSlugProject(slug)}
                      setSlugProject={setSlugProject}
                      author={autor.apelido}
                      queryClient={queryClient}
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
                      <Box
                        component="img"
                        src={`http://127.0.0.1:8000${imagem}`}
                        alt="teste"
                        sx={{
                          borderRadius: '6px',
                          height: '100%',
                          objectFit: 'cover',
                          width: '100%',
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
          </>
        ))}
    </>
  );
};

ProjectsItem.propTypes = {
  params: PropTypes.object,
  url: PropTypes.string,
  page: PropTypes.number,
  infinite: PropTypes.bool,
  setInfinite: PropTypes.func,
  queryClient: PropTypes.object,
};

export default ProjectsItem;
