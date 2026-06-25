import React from 'react'
import { Typography, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Stack, FormHelperText } from '@mui/material'
import { margin } from '@mui/system'

const Question2 = ({ onJumpSelect }) => (
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
      Schaffst du einen 1,5m Präzisions Sprung?
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
        <FormControlLabel value="ja" control={<Radio />} label="< 1 Jahr" />
        <FormControlLabel value="2" control={<Radio />} label="1 - 2 Jahre" />

      </RadioGroup>
    </FormControl>
  </Stack>
)

export default Question2
