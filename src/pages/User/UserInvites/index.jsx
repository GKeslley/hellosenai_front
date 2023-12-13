import { Grid, Typography } from '@mui/material';
import Loading from '../../../components/Helper/Loading';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfileInvite from '../../Profile/ProfileInvites/ProfileInvite';
import Stylebreak from '../../../components/Stylebreak';
import { useContext } from 'react';
import { UserGlobalContext } from '../../../contexts/UserContext';

const UserInvites = ({ username }) => {
  const { data: userData } = useContext(UserGlobalContext);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['userInvites'],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/usuario/${username}/convites`)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  return (
    <Grid container alignItems="stretch" wrap="wrap" marginBottom="2rem">
      {data ? (
        <>
          {data.data.map(({ titulo, descricao, slug }) => (
            <ProfileInvite
              key={slug}
              title={titulo}
              description={descricao}
              slug={slug}
              actions={userData ? userData.apelido === username : false}
              queryClient={queryClient}
            />
          ))}
          <Stylebreak length={data.data.length} width="250px" />
        </>
      ) : (
        <Typography>O usuário não possui convites</Typography>
      )}
    </Grid>
  );
};

UserInvites.propTypes = {
  username: PropTypes.string,
};

export default UserInvites;
