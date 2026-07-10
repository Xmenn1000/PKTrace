import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import SkillLevel from './level'
import { useUser } from '../../../hooks/useUser'

const levelConfig = {
  [SkillLevel.LOW]: {
    label: 'Anfänger',
    description:
      'Du stehst noch am Anfang deiner Parkour-Reise. Konzentriere dich auf grundlegende Bewegungen wie Rollen, Balance und einfache Sprünge – du hast wenig Erfahrung mit Jumps und kennst noch nicht viele Moves. Jeder Profi hat mal hier angefangen!'
  },
  [SkillLevel.MID]: {
    label: 'Fortgeschritten',
    description:
      'Du hast bereits eine solide Basis und kennst einige Parkour-Moves. Du kannst Sprünge ausführen und weißt, worauf es beim sauberen Landen ankommt. Arbeite daran, deine Technik zu verfeinern und neue Herausforderungen zu meistern.'
  },
  [SkillLevel.HIGH]: {
    label: 'Profi',
    description:
      'Beeindruckend! Du bringst mehrere Jahre Erfahrung mit, beherrschst fortgeschrittene Techniken und kannst komplexe Bewegungsabläufe sauber und sicher ausführen. Setze neue Maßstäbe und inspiriere andere!'
  }
}

const SkillResult = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useUser()

  const name = location.state?.name ?? ''
  const detectedLevel = location.state?.detectedLevel
  const config = levelConfig[detectedLevel] ?? levelConfig[SkillLevel.LOW]

  const handleWeiter = () => {
    setUser({ name, level: detectedLevel })
    navigate('/start')
  }

  const handleRestart = () => {
    navigate('/tutorial', { state: { name } })
  }

  return (
    <CommonPage title="PK Trace Skilltest">
      <Stack
        height="100%"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ px: 1 }}
      >
        <Typography variant="body1" textAlign="center">
          Dein Skill Level ist ...
        </Typography>

        <Typography variant="h3" fontWeight="bold" textAlign="center">
          {config.label}
        </Typography>

        <Typography variant="body2" textAlign="center">
          {config.description}
        </Typography>

        <Stack spacing={1.5} width="100%" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="caption" textAlign="center" color="text.secondary">
            Du bist der Meinung du wurdest falsch eingeschätzt, starte hier den Skill test neu
          </Typography>
          <Button
            variant="outlined"
            onClick={handleRestart}
            fullWidth
          >
            neuer Skilltest
          </Button>
          <Button
            variant="contained"
            onClick={handleWeiter}
            fullWidth
          >
            Weiter
          </Button>
        </Stack>
      </Stack>
    </CommonPage>
  )
}

export default SkillResult
