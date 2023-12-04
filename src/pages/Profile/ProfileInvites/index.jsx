import { Grid } from '@mui/material';
import ProfileInvite from './ProfileInvite';
import { useContext } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../../components/Helper/Loading';

const ProfileInvites = () => {
  const { data: userData } = useContext(UserGlobalContext);

  const { data, isLoading } = useQuery(
    'userInvites',
    () => {
      if (userData) {
        return axios
          .get(`http://127.0.0.1:8000/api/v1/usuario/${userData.apelido}/convites`)
          .then((response) => response.data);
      }
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <Loading />;
  return (
    <Grid component="article" container alignItems="stretch" wrap="wrap" gap="1rem">
      {data &&
        data.data.map(({ titulo, descricao, slug }) => (
          <ProfileInvite key={slug} title={titulo} description={descricao} slug={slug} />
        ))}
    </Grid>
  );
};

export default ProfileInvites;
