import axios from 'axios';
import { useQuery } from 'react-query';
import Invite from '../../../components/Home/Invites/Invite';
import Stylebreak from '../../../components/Stylebreak';
import PropTypes from 'prop-types';
import Loading from '../../../components/Helper/Loading';

const InvitesItem = ({
  params,
  url,
  page,
  infinite,
  setInfinite,
  modalAccessInvite,
  setDataInvite,
}) => {
  console.log(params);
  const { data, isLoading } = useQuery(
    [params, page, 'invites'],
    () => {
      return axios.get(`${url}&page=${page}`).then((response) => response.data);
    },
    { refetchOnWindowFocus: false },
  );

  if (infinite && data && !data.links.next) {
    setInfinite(false);
  }

  if (isLoading) return <Loading />;
  return (
    <>
      {data && (
        <>
          {data.data.map(({ titulo, descricao, dataCriacao, slug, autor }) => (
            <Invite
              key={slug}
              modalAccessInvite={modalAccessInvite}
              title={titulo}
              description={descricao}
              date={dataCriacao}
              slug={slug}
              author={autor}
              setDataInvite={setDataInvite}
            />
          ))}
          <Stylebreak length={data.data.length - 1} width="250px" />
        </>
      )}
    </>
  );
};

InvitesItem.propTypes = {
  params: PropTypes.object,
  url: PropTypes.string,
  page: PropTypes.number,
  infinite: PropTypes.bool,
  setInfinite: PropTypes.func,
  modalAccessInvite: PropTypes.func,
  setDataInvite: PropTypes.func,
};

export default InvitesItem;