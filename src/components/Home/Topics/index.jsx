import { Container, Paper, Stack, Typography, styled } from '@mui/material';
import Subtitle from '../../Subtitle';
import { Link } from 'react-router-dom';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import { LocationOn } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Topics = ({ refProject, refInvites, refAdversiting, refMap }) => {
  const handleScrollDown = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Container>
      <Subtitle>Tópicos</Subtitle>
      <Stack direction="row" className="flex-wrap gap-5 justify-between">
        <Link
          onClick={() => handleScrollDown(refProject)}
          className="block min-w-[12rem] grow"
        >
          <Item className="flex gap-2 justify-center" sx={{ padding: '1rem' }}>
            <DesignServicesIcon />
            <Typography>Projetos Recentes</Typography>
          </Item>
        </Link>
        <Link
          onClick={() => handleScrollDown(refInvites)}
          className="block min-w-[12rem] grow"
        >
          <Item className="flex gap-2 justify-center" sx={{ padding: '1rem' }}>
            <EmailIcon />
            <Typography>Convites</Typography>
          </Item>
        </Link>
        <Link
          onClick={() => handleScrollDown(refAdversiting)}
          className="block min-w-[12rem] grow"
        >
          <Item className="flex gap-2 justify-center" sx={{ padding: '1rem' }}>
            <SchoolIcon />
            <Typography>Mais Senai</Typography>
          </Item>
        </Link>
        <Link
          onClick={() => handleScrollDown(refMap)}
          className="block min-w-[12rem] grow"
        >
          <Item className="flex gap-2 justify-center" sx={{ padding: '1rem' }}>
            <LocationOn />
            <Typography>Localização</Typography>
          </Item>
        </Link>
      </Stack>
    </Container>
  );
};

export default Topics;

Topics.propTypes = {
  refProject: PropTypes.object,
  refInvites: PropTypes.object,
  refAdversiting: PropTypes.object,
  refMap: PropTypes.object,
};
