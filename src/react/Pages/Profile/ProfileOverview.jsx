import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Stack, Button } from '@mui/material'
import { AppSettingsAlt as SettingsIcon, AutoFixNormal as WizardIcon } from '@mui/icons-material'

const ProfileOverview = () => {
  const navigate = useNavigate()

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <Button
        variant="contained"
        startIcon={<SettingsIcon />}
        onClick={() => navigate('/profile/settings')}
      >
        Go to Settings
      </Button>
      <Button
        variant="outlined"
        startIcon={<WizardIcon />}
        onClick={() => navigate('/tutorial')}
      >
        Skill Test wiederholen
      </Button>
    </Stack>
  )
}

export default ProfileOverview
