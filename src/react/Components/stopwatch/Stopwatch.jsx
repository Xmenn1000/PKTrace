import React, { useEffect, useRef, useState } from 'react'
import { Typography, Stack } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

const Stopwatch = ({ onTimeElapsed }) => {
  const [milliseconds, setMilliseconds] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds(prev => prev + 10)
    }, 10)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    onTimeElapsed?.(milliseconds)
  }, [milliseconds, onTimeElapsed])

  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  const millis = milliseconds % 1000

  const formattedTime =
    `${minutes}:${seconds.toString().padStart(2, '0')}.${millis
      .toString()
      .padStart(3, '0')}`

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 2 }}
    >
      <AccessAlarmIcon color="primary" />

      <Typography variant="h6" fontWeight={600}>
        {formattedTime}
      </Typography>
    </Stack>
  )
}

export default Stopwatch
