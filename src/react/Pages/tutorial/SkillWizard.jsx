import React, { useState } from 'react'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router-dom'

import { Typography, Button, Divider, LinearProgress } from '@mui/material'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import SingleSelectionQuestion from '../../Components/skillWizard/SingleSelectionQuestion'
import YesNoQuestion from '../../Components/skillWizard/YesNoQuestion'
import SkillLevel from './level'
import {
  knownMovesQuestion,
  knownMovesOptions,
  jumpQuestion,
  cleanQuestion,
  yearQuestion,
  yearOptions,
  standingJumpQuestion,
  pushupsQuestion,
  stickQuestion,
  condiQuestion,
  conditionOptions,
  jumpHighQuestion,
  crouchBalance
} from '../../../data/questions'
import MultiSelectionQuestion from '../../Components/skillWizard/MultiSelectionQuestion'
import SliderQuestion from '../../Components/skillWizard/SliderQuestion'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'
import {
  getSingleSelectionPoints,
  knownMovesPoints,
  getSliderPoints
} from './calculating-functions'

// https://mui.com/material-ui/react-progress/

const NUMBER_OF_QUESTIONS = 10

const SkillWizard = () => {
  const navigate = useNavigate()
  const { setSkillLevel } = useUser()
  // one based
  const [progress, setprogress] = useState(1)
  const [years, setYears] = useState('')
  const [canDoJump, setCanDoJump] = useState('')
  const [canDoCleanMoves, setcanDoCleanMoves] = useState('')
  const [knowMoves, setKnowMoves] = useState([])
  const [standingJumpCount, setStandingJumpCount] = useState('')
  const [pushUpCount, setPushUpCount] = useState('')
  const [correctStickCount, setCorrectStickCount] = useState('')
  const [conditionCount, setConditionCount] = useState('')
  const [canJumpHigh, setCanJumpHigh] = useState('')
  const [canCrouchBalance, setCanCrouchBalance] = useState('')

  const isActive = (number) => progress === number
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  const currentProgress = () => clamp(Math.ceil(100 / NUMBER_OF_QUESTIONS) * progress, 0, 100)
  const lastPage = () => progress === NUMBER_OF_QUESTIONS

  const calculateScore = () => {
    const yearPoints = getSingleSelectionPoints(yearOptions, years)
    const jumpPoints = canDoJump === 'yes' ? jumpQuestion.points : 0
    const cleanPoints = canDoCleanMoves === 'yes' ? cleanQuestion.points : 0
    const movesPoints = knownMovesPoints(knowMoves, knownMovesOptions)
    const standingJumpPoints = getSliderPoints(standingJumpQuestion, standingJumpCount)
    const pushUpPoints = getSliderPoints(pushupsQuestion, pushUpCount)
    const stickPoints = getSliderPoints(stickQuestion, correctStickCount)
    const condiPoints = getSingleSelectionPoints(conditionOptions, conditionCount)
    const highJumpPoints = getSliderPoints(jumpHighQuestion, canJumpHigh)
    const crouchBalancePoints = getSliderPoints(crouchBalance, canCrouchBalance)

    return (
      yearPoints +
      jumpPoints +
      cleanPoints +
      movesPoints +
      standingJumpPoints +
      pushUpPoints +
      stickPoints +
      condiPoints +
      highJumpPoints +
      crouchBalancePoints
    )
  }

  const calculateSkillLevel = (score) => {
    console.log(score)
    if (score < 15) {
      return SkillLevel.LOW
    }
    if (score < 30) {
      return SkillLevel.MID
    }
    return SkillLevel.HIGH
  }

  const handleFinishClick = () => {
    const score = calculateScore()
    const level = calculateSkillLevel(score)
    setSkillLevel(level)
    navigate('/tutorial/result')
  }

  const handleContinueClick = () => {
    if (progress !== NUMBER_OF_QUESTIONS) {
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
      return years !== ''
    }
    if (progress === 2) {
      return canDoJump !== ''
    }
    if (progress === 3) {
      return true
    }
    if (progress === 4) {
      return canDoCleanMoves !== ''
    }
    if (progress === 5) {
      return standingJumpCount !== ''
    }
    if (progress === 6) {
      return pushUpCount !== ''
    }
    if (progress === 7) {
      return correctStickCount !== ''
    }
    if (progress === 8) {
      return conditionCount !== ''
    }
    if (progress === 9) {
      return canJumpHigh !== ''
    }
    if (progress === 10) {
      return canCrouchBalance !== ''
    }
    return false
  }

  return (
    <CommonPage title="   PK SkillWizard" headerAktions={<AutoFixNormalIcon />} showHome={false} showGoBack>

      <Stack
        width="100%"
        justifyContent="center"
        alignItems="center"
        flex="1 1 auto"
        sx={{
          paddingY: 3
        }}
      >
        {isActive(1) && <SingleSelectionQuestion question={yearQuestion} onSelect={setYears} options={yearOptions} currentValue={years} />}
        {isActive(2) && <YesNoQuestion question={jumpQuestion.question} onSelect={setCanDoJump} currentValue={canDoJump} />}
        {isActive(3) && <MultiSelectionQuestion question={knownMovesQuestion} options={knownMovesOptions} onSelect={setKnowMoves} currentValues={knowMoves} />}
        {isActive(4) && <YesNoQuestion question={cleanQuestion.question} onSelect={setcanDoCleanMoves} currentValue={canDoCleanMoves} />}
        {isActive(5) && (<SliderQuestion question={standingJumpQuestion.question} options={standingJumpQuestion.options} currentValue={standingJumpCount} onSelect={setStandingJumpCount} />)}
        {isActive(6) && (<SliderQuestion question={pushupsQuestion.question} options={pushupsQuestion.options} currentValue={pushUpCount} onSelect={setPushUpCount} />)}
        {isActive(7) && (<SliderQuestion question={stickQuestion.question} options={stickQuestion.options} currentValue={correctStickCount} onSelect={setCorrectStickCount} />)}
        {isActive(8) && <SingleSelectionQuestion question={condiQuestion.question} onSelect={setConditionCount} options={conditionOptions} currentValue={conditionCount} />}
        {isActive(9) && (<SliderQuestion question={jumpHighQuestion.question} options={jumpHighQuestion.options} labels={jumpHighQuestion.labels} currentValue={canJumpHigh} onSelect={setCanJumpHigh} />)}
        {isActive(10) && (<SliderQuestion question={crouchBalance.question} options={crouchBalance.options} currentValue={canCrouchBalance} onSelect={setCanCrouchBalance} />)}
      </Stack>

      <Stack
        width="100%"
        spacing={1.5}
        padding="10px"
      >
        <Typography variant="body2" textAlign="center">
          Schritt
          {' '}
          {progress}
          {' '}
          von
          {' '}
          {NUMBER_OF_QUESTIONS}
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
    </CommonPage>
  )
}

export default SkillWizard