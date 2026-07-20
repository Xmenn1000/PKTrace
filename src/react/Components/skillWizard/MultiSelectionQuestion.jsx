import React from 'react'
import { Typography, FormControl, FormControlLabel, Stack, Checkbox } from '@mui/material'
// https://mui.com/material-ui/react-stack/
// https://mui.com/material-ui/react-radio-button/
// https://mui.com/material-ui/api/form-control/

const MultiSelectionQuestion = ({ question, options, onSelect, currentValues }) => {
  const toggle = (value) => {
    console.log(value)
    onSelect(
      currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
    )
  }

  return (<Stack sx={{
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <Typography
      variant="h5"
      textAlign="center"
      sx={{ marginBottom: 2 }}
    >
      { question }
    </Typography>
    <FormControl>
      {options.map((singleOption) => (
        <FormControlLabel
          key={singleOption.value}
          value={singleOption.value}
          control={<Checkbox checked={currentValues.includes(singleOption.value)} onChange={() => toggle(singleOption.value)} />}
          label={singleOption.label}
        />))}
    </FormControl>
  </Stack>
  )
}

export default MultiSelectionQuestion
