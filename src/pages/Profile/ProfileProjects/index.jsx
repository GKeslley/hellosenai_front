import { Box } from '@mui/material';
import ProfileProject from './ProfileProject';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';
import Loading from '../../../components/Helper/Loading';
import Stylebreak from '../../../components/Stylebreak';

const ProfileProjects = () => {
  const { data: userData } = useContext(UserGlobalContext);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['userProjects'],
    queryFn: () => {
      if (userData) {
        return axios
          .get(`http://127.0.0.1:8000/api/v1/usuario/${userData.apelido}/projetos`)
          .then((response) => response.data);
      }
    },
    refetchOnWindowFocus: false,
  });

  console.log(data.data.length);

  if (isLoading) return <Loading />;
  return (
    <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {data && (
        <>
          {data.data.map(
            ({ nomeProjeto, descricao, participantes, projetoStatus, slug, imagem }) => (
              <ProfileProject
                key={slug}
                name={nomeProjeto}
                slug={slug}
                image={imagem}
                description={descricao}
                participants={participantes}
                status={projetoStatus}
                queryClient={queryClient}
              />
            ),
          )}

          { <Stylebreak length={data.data.length} width="250px" />}
        </>
      )}
    </Box>
  );
};

export default ProfileProjects;
