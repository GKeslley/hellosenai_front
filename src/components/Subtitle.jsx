import React from 'react'
import Typography from '@mui/material/Typography';

const Subtitle = ({children, sx}) => {
  return (
    <Typography variant="h1" fontSize={30} fontWeight="400" sx={sx} className="text-stone-400 font-bold">
      {children}
    </Typography> 
  )
}

export default Subtitle