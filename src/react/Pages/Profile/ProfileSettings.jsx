import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Typography, Button, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, useColorScheme } from '@mui/material'
import { ArrowBack as BackIcon } from '@mui/icons-material'
import { Box } from '@mui/system'

const ProfileSettings = () => {
  const navigate = useNavigate()
  const { mode, setMode } = useColorScheme()

  return (
    // This is a React Fragment. It is a virtual React Component that will not render a HTML-DOM-Element
    // We need to use it here, because we want to render two Components (Typography, Button) with no parent around them.
    <>
      <Typography
        variant="h4"
      >
        Here are your Settings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
          minHeight: '56px'
        }}
      >
        <FormControl>
          <FormLabel id="demo-theme-toggle">Theme</FormLabel>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            <FormControlLabel value="system" control={<Radio />} label="System" />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        startIcon={<BackIcon />}
        onClick={() => navigate('/profile')}
      >
        Go back to Profile Overview
      </Button>
    </>
  )
}

export default ProfileSettings
