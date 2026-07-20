import React from 'react'
import { Slider, Typography, FormControl, Stack } from '@mui/material'

const SliderQuestion
 = ({ question, options, onSelect, currentValue }) => (
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
     <FormControl sx={{ width: 300 }}>
       <Slider
         value={Number(currentValue)}
         onChange={(event, value) => onSelect(value)}
         step={options.step}
         marks
         min={options.min}
         max={options.max}
         valueLabelDisplay="auto"
       />
       <Typography
         variant="h6"
         textAlign="center"
         color="primary.main"
         sx={{ mt: 1 }}
       >
         {currentValue}
       </Typography>
     </FormControl>
   </Stack>
 )

export default SliderQuestion
