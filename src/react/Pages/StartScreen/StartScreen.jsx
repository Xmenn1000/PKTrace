import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { useUser } from '../../../hooks/useUser'

const StartScreen = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const name = user?.name ?? 'Gast'
  const level = user?.level ?? ''

  return (
    <Stack
      flex="1 1 auto"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ px: 4, maxWidth: 400, mx: 'auto', width: '100%' }}
    >
      <Stack alignItems="center" spacing={0.5}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Hallo &quot;
          {name}
          &quot;!
        </Typography>
        {level && (
          <Typography variant="body2" color="text.secondary">
            Skill level:
            {' '}
            {level}
          </Typography>
        )}
      </Stack>

      <Divider sx={{ width: '100%' }} />

      <Typography variant="body1" textAlign="center">
        Womit magst du heute Starten?
      </Typography>

      <Stack spacing={2} width="100%" alignItems="center">
        <Stack alignItems="center" spacing={1} width="100%">
          <Button
            variant="outlined"
            onClick={() => navigate('/spots')}
            sx={{ borderRadius: 6, px: 4, py: 1, width: '70%' }}
          >
            Trainingsspots
          </Button>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Finde Beliebte Pakourspots, und starte direkt mit deiner ersten Session!
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={1} width="100%">
          <Button
            variant="outlined"
            onClick={() => navigate('/challenges/all')}
            sx={{ borderRadius: 6, px: 4, py: 1, width: '70%' }}
          >
            Challenges
          </Button>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Finde für dich passende Herrausforderungen um dich und deine Pakourkünste zu verbessern
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default StartScreen
