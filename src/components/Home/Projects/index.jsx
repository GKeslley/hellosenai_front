import React from 'react'
import Typography from '@mui/material/Typography';
import Subtitle from '../../Subtitle';
import teste from '../../../assets/logo.png'
import teste2 from '../../../assets/logo2.png'

const Projects = () => {
  return (
    <div>
      <Subtitle sx={{marginBottom: '2.5rem'}}>Projetos Publicados Recentemente</Subtitle>
      <ul className='flex gap-x-8 gap-y-10 flex-wrap'>
        <li className='min-w-[20rem] flex-1'>
          <img src={teste} alt="teste" className='mb-2 object-cover min-h-[10rem] max-h-40 min-w-full' />
          <Typography variant="body1" fontWeight="500" className='text-stone-500 font-bold'>
            Projeto e-commerce
          </Typography> 
          <Typography variant="body1" fontWeight="300" className='text-stone-400 font-bold'>
            Lorem ipsum dolor sit amet, cons
            ectetur adipiscing elit. Integer vel 
            laoreet velit, at iaculis nulla. Cras
            aliquet purus augue, laoreet bibe
            ndum tortor malesuada eu.
          </Typography> 
        </li>

        <li className='min-w-[20rem] flex-1'>
          <img src={teste2} alt="teste" className='mb-2 object-cover min-h-[10rem] max-h-40 min-w-full' />
          <Typography variant="body1" fontWeight="500" className='text-stone-500 font-bold'>
            Projeto dots
          </Typography> 
          <Typography variant="body1" fontWeight="300" className='text-stone-400 font-bold'>
            Lorem ipsum dolor sit amet, cons
            ectetur adipiscing elit. Integer vel 
            laoreet velit, at iaculis nulla. Cras
            aliquet purus augue, laoreet bibe
            ndum tortor malesuada eu.
          </Typography> 
        </li>

        <li className='min-w-[20rem] flex-1'>
          <img src={teste} alt="teste" className='mb-2 object-cover min-h-[10rem] max-h-40 min-w-full' />
          <Typography variant="body1" fontWeight="500" className='text-stone-500 font-bold'>
            Criação game
          </Typography> 
          <Typography variant="body1" fontWeight="300" className='text-stone-400 font-bold'>
            Lorem ipsum dolor sit amet, cons
            ectetur adipiscing elit. Integer vel 
            laoreet velit, at iaculis nulla. Cras
            aliquet purus augue, laoreet bibe
            ndum tortor malesuada eu.
          </Typography> 
        </li>
      </ul>
    </div>
  )
}

export default Projects