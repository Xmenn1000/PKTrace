import React from 'react'
import { TextField } from '@mui/material'

const PickName = ({ value, setValue }) => (
  <TextField
    label="Name..."
    variant="outlined"
    value={value}
    required
    fullWidth
    onChange={(event) => setValue(event.target.value)}
  />)

export default PickName
