import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography, Alert, AlertTitle } from '@mui/material'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import SkillLevel from './level'
import { useUser } from '../../../hooks/useUser'

const WelcomeSkill = () => {
  const { user, setSkillLevel } = useUser()
  const navigate = useNavigate()

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

        <FormControl fullWidth>
          <InputLabel id="skill-level-label">Level auswählen</InputLabel>
          <Select
            labelId="skill-level-label"
            id="skill-level"
            value={user?.skillLevel ?? ''}
            label="Level auswählen"
            onChange={(event) => setSkillLevel(event.target.value)}
          >
            <MenuItem value={SkillLevel.LOW}>{SkillLevel.LOW}</MenuItem>
            <MenuItem value={SkillLevel.MID}>{SkillLevel.MID}</MenuItem>
            <MenuItem value={SkillLevel.HIGH}>{SkillLevel.HIGH}</MenuItem>
          </Select>
        </FormControl>

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
