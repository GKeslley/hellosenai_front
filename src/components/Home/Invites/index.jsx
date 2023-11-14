import Icon from '../../Icon';
import Subtitle from '../../Subtitle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Invite from './Invite/index';
import { Box, Button, Container } from '@mui/material';
import { useRef } from 'react';
import useMedia from '../../../hooks/useMedia';

const Invites = () => {
  const carouselRef = useRef();
  const screenIsMobile = useMedia('(max-width: 800px)');

  const handleLeftClick = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth + 16;
  };

  const handleRightClick = () => {
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  return (
    <Container sx={{ display: 'grid' }}>
      <div className="flex justify-between items-center mb-10">
        <Subtitle>Participe de Novos Projetos</Subtitle>
        {!screenIsMobile && (
          <div className="flex gap-4">
            <i onClick={handleLeftClick} className="cursor-pointer">
              <Icon icon={ArrowBackIosNewIcon} />
            </i>
            <i onClick={handleRightClick} className="cursor-pointer">
              <Icon icon={ArrowForwardIosIcon} />
            </i>
          </div>
        )}
      </div>
      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          gap: 1,
          py: 1,
          overflow: 'hidden',
          width: '100%',
          scrollBehavior: 'smooth',
          marginBottom: '1rem',
          scrollSnapType: 'x mandatory',
          '& > *': {
            scrollSnapAlign: 'center',
          },
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Invite />
        <Invite />
        <Invite />
        <Invite />
        <Invite />
        <Invite />
      </Box>
      <Button variant="contained" className="justify-self-center max-w-max">
        Mais Convites
      </Button>
    </Container>
  );
};

export default Invites;
