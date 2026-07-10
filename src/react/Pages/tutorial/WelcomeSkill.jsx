import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import SkillLevel from './level'

const WelcomeSkill = () => {
  const [level, setLevel] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const name = location.state?.name ?? ''

  useEffect(() => {
    const detectedLevel = location.state?.detectedLevel
    if (detectedLevel && Object.values(SkillLevel).includes(detectedLevel)) {
      setLevel(detectedLevel)
    }
  }, [location.state])

  const handleFinish = () => {
    navigate('/tutorial/result', { state: { name, detectedLevel: level } })
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
          Wähle deinen Skill level:
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="skill-level-label">Level auswählen</InputLabel>
          <Select
            labelId="skill-level-label"
            id="skill-level"
            value={level}
            label="Level auswählen"
            onChange={(event) => setLevel(event.target.value)}
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
          variant="outlined"
          onClick={() => navigate('/tutorial', { state: { name } })}
          fullWidth
        >
          Skilltest
        </Button>

        <Button
          variant="contained"
          disabled={!level}
          onClick={handleFinish}
          fullWidth
        >
          Weiter
        </Button>
      </Stack>
    </CommonPage>
  )
}

export default WelcomeSkill
