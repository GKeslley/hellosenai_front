import PropTypes from 'prop-types';
import ChallengeItem from './ChallengeItem';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../../../Helper/Loading';
import { useEffect } from 'react';

const ChallengePosted = ({
  page,
  username,
  infinite,
  setInfinite,
  author,
  setAuthor,
  setChallenge,
  setOpenDialog,
  dataUser,
  openSnackbar,
  setOpenSnackbar,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['challengesTeacher', page, username],
    queryFn: () => {
      return axios
        .get(`http://127.0.0.1:8000/api/v1/professor/${username}/desafios?page=${page}`)
        .then((response) => response.data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && author.username !== username) {
      setAuthor({ name: data.autor.nome, username: data.autor.apelido });
    }
  }, [data, author, username, setAuthor]);

  useEffect(() => {
    if (infinite && data && !data.links.next) {
      setInfinite(false);
    }
  }, [infinite, data, setInfinite]);

  if (isLoading) return <Loading />;
  if (error) return null;

  return (
    <>
      {data &&
        data.desafios.map(({ desafio: { titulo, descricao, dataCriacao, slug } }) => (
          <ChallengeItem
            key={slug}
            data={{ titulo, descricao, dataCriacao, slug, autor: data.autor }}
            setChallenge={setChallenge}
            setOpenDialog={setOpenDialog}
            dataUser={dataUser}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
          />
        ))}
    </>
  );
};

ChallengePosted.propTypes = {
  username: PropTypes.string,
  page: PropTypes.number,
  infinite: PropTypes.bool,
  setInfinite: PropTypes.func,
  author: PropTypes.object,
  setAuthor: PropTypes.func,
  setChallenge: PropTypes.func,
  setOpenDialog: PropTypes.func,
  dataUser: PropTypes.object,
  openSnackbar: PropTypes.bool,
  setOpenSnackbar: PropTypes.func,
};

export default ChallengePosted;
