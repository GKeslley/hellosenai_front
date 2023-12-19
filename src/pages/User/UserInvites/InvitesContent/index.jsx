import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Loading from '../../../../components/Helper/Loading';
import InviteItem from '../InviteItem';
import Stylebreak from '../../../../components/Stylebreak';
import { UserGlobalContext } from '../../../../contexts/UserContext';
import { Grid, Typography } from '@mui/material';

const InvitesContent = ({ page, username, infinite, setInfinite }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useContext(UserGlobalContext);

  const { data, isLoading } = useQuery({
    queryKey: ['userInvites', page],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/usuario/${username}/convites?page=${page}`)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (infinite && data && !data.links.next) {
    setInfinite(false);
  }

  if (isLoading) return <Loading />;

  return (
    <Grid container alignItems="stretch" wrap="wrap">
      {data ? (
        <>
          {data.data.map(({ titulo, descricao, slug }) => (
            <InviteItem
              key={slug}
              title={titulo}
              description={descricao}
              slug={slug}
              actions={userData ? userData.apelido === username : false}
              queryClient={queryClient}
            />
          ))}

          <Stylebreak length={data.data.length > 0 ? data.data.length - 1 : 0} width="300px" />
        </>
      ) : (
        <Typography>O usuário não tem convites</Typography>
      )}
    </Grid>
  );
};

InvitesContent.propTypes = {
  page: PropTypes.number,
  username: PropTypes.string,
  infinite: PropTypes.any,
  setInfinite: PropTypes.func,
};

export default InvitesContent;
