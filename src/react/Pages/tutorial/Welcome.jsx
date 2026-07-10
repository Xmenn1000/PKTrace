import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'

const Welcome = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleNext = () => {
    navigate('/welcome/skill', { state: { name } })
  }

  return (
    <CommonPage title="Willkommen bei PK Trace">
      <Stack
        height="100%"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ px: 1 }}
      >
        <Typography variant="body1" textAlign="center">
          Verrate uns wie du heißen willst...
        </Typography>

        <TextField
          label="Name..."
          variant="outlined"
          value={name}
          required
          fullWidth
          onChange={(event) => setName(event.target.value)}
        />

        <Button
          variant="contained"
          disabled={!name}
          onClick={handleNext}
          fullWidth
        >
          Weiter
        </Button>
      </Stack>
    </CommonPage>
  )
}

export default Welcome
