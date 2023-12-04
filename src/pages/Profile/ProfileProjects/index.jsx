import { Box } from '@mui/material';
import ProfileProject from './ProfileProject';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';
import Loading from '../../../components/Helper/Loading';

const ProfileProjects = () => {
  const { data: userData } = useContext(UserGlobalContext);

  const { data, isLoading } = useQuery(
    'userProjects',
    () => {
      if (userData) {
        return axios
          .get(`http://127.0.0.1:8000/api/v1/usuario/${userData.apelido}/projetos`)
          .then((response) => response.data);
      }
    },
    { refetchOnWindowFocus: false },
  );

  console.log(data);

  if (isLoading) return <Loading />;
  return (
    <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {data &&
        data.data.map(
          ({ nomeProjeto, descricao, participantes, status, slug, imagem }) => (
            <ProfileProject
              key={slug}
              name={nomeProjeto}
              slug={slug}
              image={imagem}
              description={descricao}
              participants={participantes}
              status={status}
            />
          ),
        )}
    </Box>
  );
};

export default ProfileProjects;
