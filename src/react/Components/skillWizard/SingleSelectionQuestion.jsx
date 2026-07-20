import React from 'react'
import { Typography, FormControl, FormControlLabel, RadioGroup, Radio, Stack } from '@mui/material'
import PropTypes from 'prop-types'

// https://mui.com/material-ui/react-stack/
// https://mui.com/material-ui/react-radio-button/
// https://mui.com/material-ui/api/form-control/

const SelectionQuestion = ({ question, options, onSelect, currentValue }) => (

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
        aria-labelledby="years-label"
        name="radio-buttons-group"
        value={currentValue}
        onChange={(value) => {
          onSelect(value.target.value)
          console.log(`Question 1 Answered with: ${value.target.value}`)
        }}

      >
        {options.map((singleOption) => <FormControlLabel key={singleOption.label} value={singleOption.value} control={<Radio />} label={singleOption.label} />)}
      </RadioGroup>
    </FormControl>
  </Stack>
)

SelectionQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.string
}

export default SelectionQuestion
