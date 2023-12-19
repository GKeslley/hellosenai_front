import { Box } from '@mui/system';
import Stylebreak from '../../Stylebreak';
import ChallengeCard from '../ChallengeCard';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

const ChallengeCards = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        marginTop: '2rem',
        padding: isMobile ? '0 1rem' : '0 2rem',
        alignSelf: 'flex-start',
      }}
    >
      {data && (
        <>
          {data.data.map(({ nome, apelido, avatar, desafios }) => (
            <ChallengeCard
              key={apelido}
              name={nome}
              username={apelido}
              avatar={avatar}
              challenges={desafios}
            />
          ))}

          <Stylebreak length={data.data.length} width="18.75rem" />
        </>
      )}
    </Box>
  );
};

ChallengeCards.propTypes = {
  data: PropTypes.object,
};

export default ChallengeCards;
