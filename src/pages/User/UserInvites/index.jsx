import { Grid, Typography } from '@mui/material';
import Loading from '../../../components/Helper/Loading';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProfileInvite from '../../Profile/ProfileInvites/ProfileInvite';
import Stylebreak from '../../../components/Stylebreak';

const UserInvites = ({ username }) => {
  const { data, isLoading } = useQuery(
    'userInvites',
    () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/usuario/${username}/convites`)
        .then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

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
              actions={false}
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
