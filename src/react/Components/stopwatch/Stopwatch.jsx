import React, { useState, useEffect } from 'react'
import { Typography, Stack } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

const Stopwatch = ({ isRunning }) => {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedTime =
  `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  if (!isRunning) {
    return null
  }

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
