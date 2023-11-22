import { AccountCircle } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({required, id, fullWidth, label, variant = 'outlined', ...props}) => {
  return (
    <TextField id={id} required={required} fullWidth={fullWidth} label={label} variant={variant} {...props}
     />
  )
}

export default Input