import React from 'react'
import {
  Slider,
  Typography,
  FormControl,
  Stack
} from '@mui/material'

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
      </FormControl>
    </Stack>
  )
}

export default SliderQuestion
