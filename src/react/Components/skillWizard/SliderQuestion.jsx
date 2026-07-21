import React from 'react'
import {
  Slider,
  Typography,
  FormControl,
  Stack
} from '@mui/material'
import PropTypes from 'prop-types'
import { color } from '@mui/system'

const SliderQuestion = ({
  question,
  options,
  labels,
  onSelect,
  currentValue
}) => {
  const sliderValue =
    currentValue === ''
      ? options.min
      : Number(currentValue)

  const formatValueLabel = (value) => labels?.[value] ?? value

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ marginBottom: 2 }}
      >
        {question}
      </Typography>

      <FormControl sx={{ width: 300 }}>
        <Slider
          value={sliderValue}
          onChange={(event, value) => onSelect(value)}
          step={options.step}
          marks
          min={options.min}
          max={options.max}
          valueLabelDisplay="auto"
          valueLabelFormat={formatValueLabel}
        />
        <Typography textAlign='center' sx={{ fontWeight: 600, color: "primary", fontSize: 18 }} > {sliderValue} </Typography>
      </FormControl>
    </Stack>
  )
}

SliderQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
  }).isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([''])
  ])
}

export default SliderQuestion
