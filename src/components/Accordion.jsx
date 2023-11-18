import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

const AccordionComponent = ({title, idVideo}) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel1a-header-${title}`}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{width: '100%'}}>
            <Box 
              component='iframe' 
              src={`https://www.youtube.com/embed/${idVideo}`}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              sx={{width: '100%', height: '20rem', maxHeight: '20rem'}}
            />                
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default AccordionComponent