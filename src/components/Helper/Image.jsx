import { Box, Skeleton } from '@mui/material';
import React, { useState } from 'react';

const Image = ({ src, alt, style, width, sx, ...props }) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoad = ({ target }) => {
    setSkeleton(false);
    target.style.opacity = 1;
  };

  return (
    <>
      {skeleton && <Skeleton variant="rectangular" height={'100%'} width='100%'/>}
      <Box component={'img'} onLoad={handleLoad} src={src} alt={alt} sx={{opacity: '0', ...sx}} />
    </>
  );
};

export default Image;