import React, { useState } from 'react'
import { Stack, Box } from '@mui/system'

import { Typography, Button, Divider, LinearProgress } from '@mui/material'
import Question1 from '../../Components/skillWizard/Question1'
import Question2 from '../../Components/skillWizard/Question2'
import Question3 from '../../Components/skillWizard/Question3'

// https://mui.com/material-ui/react-progress/

const SkillWizard = () => {
  const TOTAL_QUESTIONS = 3
  // one based
  const [progress, setprogress] = useState(1)
  const [years, setYears] = useState()
  const [canDoJump, setCanDoJump] = useState()

  const isActive = (number) => progress === number
  const currentProgress = () => (Math.ceil(100 / TOTAL_QUESTIONS) * progress)
  const lastPage = () => progress === 3

  const handleFinishClick = () => {
    // TODO: Handle Finish And Save
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
      return years !== null && years !== '' && years !== undefined
    }
    if (progress === 2) {
      return canDoJump !== null && canDoJump !== '' && canDoJump !== undefined
    }
    if (progress === 3) {
      return true
    }
  }
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
        {isActive(1) && <Question1 onYearSelect={setYears} />}
        {isActive(2) && <Question2 onJumpSelect={setCanDoJump} />}
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
