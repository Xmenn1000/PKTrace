import { Button, Stack, Typography, Alert, AlertTitle } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'
import PickDifficulty from '../../Components/common/PickDifficulty'

const WelcomeSkill = () => {
  const { user, setSkillLevel } = useUser()

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
          Wähle deinen Skill level:
        </Typography>

        <PickDifficulty currentDifficulty={user?.skillLevel ?? ''} setDifficulty={setSkillLevel} />

        <Typography variant="body1" textAlign="center">
          ... oder lasse deinen Skill einschätzen
        </Typography>

        <Alert
          severity="info"
          variant="outlined"
        >
          <AlertTitle>
            <Button component={Link} to="/tutorial" size="small" variant="outlined">
              Skilltest
            </Button>
          </AlertTitle>
          Kein Stress, den Skilltest kannst du jederzeit später im Profil nachholen.
        </Alert>

        <Button
          component={Link}
          to="/start"
          variant="contained"
          disabled={!user?.skillLevel}
          fullWidth
        >
          Weiter
        </Button>
      </Stack>
    </CommonPage>
  )
}

export default WelcomeSkill
