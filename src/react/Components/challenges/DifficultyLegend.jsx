import React from 'react'
import { Chip, Stack } from '@mui/material'
import { difficultyColors } from '../../../data/challenge'

const DIFFICULTY_LEVELS = [
  { label: 'Leicht', key: 'easy' },
  { label: 'Mittel', key: 'medium' },
  { label: 'Schwer', key: 'hard' },
  { label: 'dynamisch', key: 'dynamisch' }
]

const DifficultyLegend = () => (
  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
    {DIFFICULTY_LEVELS.map(({ label, key }) => (
      <Chip
        key={key}
        label={label}
        size="small"
        sx={{
          backgroundColor: difficultyColors[key].backgroundColor,
          color: difficultyColors[key].color,
          fontWeight: 600
        }}
      />
    ))}
  </Stack>
)

export default DifficultyLegend
