import React from 'react'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'

const PickName = ({ value, setValue }) => (
  <TextField
    label="Name..."
    variant="outlined"
    value={value}
    required
    fullWidth
    onChange={(event) => setValue(event.target.value)}
  />)

PickName.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

export default PickName
