import { Avatar, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

const Comment = ({author, content, time}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Box sx={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
        <Avatar sx={{width: '30px', height: '30px'}} />
        <Paper sx={{padding: '0.5rem 0.75rem', width: '100%'}}>
          <Box 
          sx={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem'}}>       
            <Typography sx={{fontWeight: '800'}}>Scofield Idehen</Typography>
      
            <Typography
              component="span"
              fontSize="0.5rem"
              className="bg-gray-400 h-1 w-1 rounded-full mx-2"
            ></Typography>

            <Typography
              component="time"
              fontSize="0.9rem"
              className="text-gray-400"
            >
              22h
            </Typography>

          </Box>

          <Typography>
            You know, I always look at becoming a developer kind of videos on YouTube with disdain.
          </Typography>
        </Paper>
      </Box>  
      <Box sx={{display: 'flex', gap: '0.25rem', alignItems: 'center', 
        maxWidth: 'max-content',
        marginLeft: '49px',
        padding: '0.3rem',
        borderRadius: '4px',
        ':hover': {backgroundColor: '#efefef', transition: '0.3s'}}}
      >
        <ChatBubbleOutlineRoundedIcon sx={{fontSize: '0.875rem', fill: '#3d3d3d'}} />
        <Typography sx={{fontSize: '0.875rem', color: '#3d3d3d'}}>Responder</Typography>
      </Box>
    </Box>
  )
}

export default Comment