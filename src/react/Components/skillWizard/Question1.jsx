import React from 'react'
import { Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Stack, FormHelperText } from '@mui/material'
import { margin } from '@mui/system'

// https://mui.com/material-ui/react-stack/
// https://mui.com/material-ui/react-radio-button/
// https://mui.com/material-ui/api/form-control/

const Question1 = ({ onYearSelect }) => (

  <Stack sx={{
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <Typography
      variant="h5"
      textAlign="center"
      sx={{ marginBottom: 2 }}
    >
      Wie lange machst du schon Parkour?
    </Typography>
    <FormControl>
      <RadioGroup
        aria-labelledby="years-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(value) => {
          onYearSelect(value.target.value)
          console.log(`Question 1 Answered with: ${value.target.value}`)
        }}

      >
        <FormControlLabel value="1" control={<Radio />} label="< 1 Jahr" />
        <FormControlLabel value="2" control={<Radio />} label="1 - 2 Jahre" />
        <FormControlLabel value="3" control={<Radio />} label="2 - 4 Jahre" />
        <FormControlLabel value="4" control={<Radio />} label="> 4 Jahre" />

      </RadioGroup>
    </FormControl>
  </Stack>
)

export default Question1
