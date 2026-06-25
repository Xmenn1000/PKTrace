import React, { useState } from 'react'
import { Stack, Box } from '@mui/system'

import { Typography, Button, Divider, LinearProgress } from '@mui/material'
import SelectionQuestion from '../../Components/skillWizard/SelectionQuestion'
import YesNoQuestion from '../../Components/skillWizard/YesNoQuestion'
import Question3 from '../../Components/skillWizard/Question3'
import SkillLevel from './level'

// https://mui.com/material-ui/react-progress/

const SkillWizard = () => {
  const TOTAL_QUESTIONS = 3
  // one based
  const [progress, setprogress] = useState(1)
  const [years, setYears] = useState('')
  const [canDoJump, setCanDoJump] = useState('')

  const isActive = (number) => progress === number
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  const currentProgress = () => clamp(0, 100, Math.ceil(100 / TOTAL_QUESTIONS) * progress)
  const lastPage = () => progress === 3

  const calculteScore = () => ((years * 10) + (canDoJump === 'yes' ? 20 : 0))

  const calculateSkillLevel = (score) => {
    if (score < 33) {
      return SkillLevel.LOW
    } if (score < 66) {
      return SkillLevel.MID
    }
    return SkillLevel.HIGH
  }

  const handleFinishClick = () => {
    const score = calculteScore()
    const level = calculateSkillLevel(score)
    console.log(`Your score ${score} is ${level}`)
  }

  const handleContinueClick = () => {
    if (progress !== TOTAL_QUESTIONS) {
      setprogress(progress + 1)
    }
  }

  const handleBackClick = () => {
    if (progress > 1) {
      setprogress(progress - 1)
    }
  }

  const isCurrentAnswerSelected = () => {
    if (progress === 1) {
      return !!years
    }
    if (progress === 2) {
      return !!canDoJump
    }
    if (progress === 3) {
      return true
    }
  }

  const yearOptions = [
    { value: '1', label: '< 1 Jahr' },
    { value: '2', label: '1 - 2 Jahre' },
    { value: '3', label: '2 - 4 Jahre' },
    { value: '4', label: '> 4 Jahre' }
  ]

  return (
    <Stack
      flex="1 1 auto"
      justifyContent="space-between"
      alignItems="center"
      width={320}
      sx={{
        paddingY: 6
      }}
    >
      <Stack width="100%" spacing={1}>
        <Typography variant="h4" textAlign="center">
          PK Trace Skilltest
        </Typography>
        <Divider sx={{
          borderBottomWidth: 5,
          width: '100%'
        }}
        />
      </Stack>

      <Stack
        width="100%"
        justifyContent="center"
        alignItems="center"
        flex="1 1 auto"
        sx={{
          paddingY: 3
        }}
      >
        {isActive(1) && <SelectionQuestion question="Schaffst du einen 1,5m Präzisions Sprung?" onSelect={setYears} options={yearOptions} currentValue={years} />}
        {isActive(2) && <YesNoQuestion question="Wie lange machst du schon Parkour?" onSelect={setCanDoJump} currentValue={canDoJump} />}
        {isActive(3) && <Question3 />}
      </Stack>

      <Stack
        width="100%"
        spacing={1.5}
      >
        <Typography variant="body2" textAlign="center">
          Schritt
          {' '}
          {progress}
          {' '}
          von
          {' '}
          {TOTAL_QUESTIONS}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={currentProgress()}
          sx={{ width: '100%',
            height: 10,
            borderRadius: 5
          }}
        />
        <Stack direction="row" justifyContent="space-around">
          <Button variant="contained" onClick={handleBackClick} disabled={progress === 1}>
            Zurück
          </Button>
          {!lastPage() && (
            <Button
              variant="contained"
              disabled={!isCurrentAnswerSelected()}
              onClick={handleContinueClick}
            >
              Weiter
            </Button>
          )}
          {lastPage() && (
            <Button
              variant="contained"
              disabled={!isCurrentAnswerSelected()}
              onClick={handleFinishClick}
            >
              Fertig
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SkillWizard
