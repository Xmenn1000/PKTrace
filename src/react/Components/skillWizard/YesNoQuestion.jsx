import React from 'react'
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio, Stack } from '@mui/material'

const YesNoQuestion = ({ question, onSelect, currentValue }) => (
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
      { question }
    </Typography>
    <FormControl>
      <RadioGroup
        value={currentValue}
        onChange={(e) => {
          onSelect(e.target.value)
          console.log(`Question 2 Answered with: ${e.target.value}`)
        }}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Ja" />
        <FormControlLabel value="no" control={<Radio />} label="Nein" />
      </RadioGroup>
    </FormControl>
  </Stack>
)

export default YesNoQuestion
