import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
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
            <MenuItem value={SkillLevel.LOW}>Beginner</MenuItem>
            <MenuItem value={SkillLevel.MID}>Medium</MenuItem>
            <MenuItem value={SkillLevel.HIGH}>Expert</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body1" textAlign="center">
          ... oder lasse deinen Skill einschätzen
        </Typography>

        <Button
          component={Link}
          to="/tutorial"
          fullWidth
        >
          Skilltest
        </Button>

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
