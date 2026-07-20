import React from 'react'
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio, Stack } from '@mui/material'
import PropTypes from 'prop-types'

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

YesNoQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOf(['yes', 'no', ''])
}

export default YesNoQuestion
