import React, { useState } from 'react'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router-dom'

import { Typography, Button, Divider, LinearProgress } from '@mui/material'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import SingleSelectionQuestion from '../../Components/skillWizard/SingleSelectionQuestion'
import YesNoQuestion from '../../Components/skillWizard/YesNoQuestion'
import SkillLevel from './level'
import { cleanQuestion,
  jumpQuestion,
  knownMovesOptions,
  knownMovesQuestion,
  pushupsQuestion,
  pushupsQuestionOptions,
  standingJumpQuestion,
  standingJumpQuestionOptions,
  stickQuestion,
  stickQuestionOptions,
  yearOptions,
  yearQuestion } from '../../../data/questions'
import MultiSelectionQuestion from '../../Components/skillWizard/MultiSelectionQuestion'
import SliderQuestion from '../../Components/skillWizard/SliderQuestion'
import CommonPage from '../Layouts/CommonPage'

// https://mui.com/material-ui/react-progress/

const NUMBER_OF_QUESTIONS = 7

const SkillWizard = () => {
  const navigate = useNavigate()
  // one based
  const [progress, setprogress] = useState(1)
  const [years, setYears] = useState('')
  const [canDoJump, setCanDoJump] = useState('')
  const [canDoCleanMoves, setcanDoCleanMoves] = useState('')
  const [knowMoves, setKnowMoves] = useState([])
  const [standingJumpCount, setStandingJumpCount] = useState('')
  const [pushUpCount, setPushUpCount] = useState('')
  const [correctStickCount, setCorrectStickCount] = useState('')
  // Effekt: Lade-State. Lädt seine Daten selbst.
  // Ein State statt vieler kleiner.

  const isActive = (number) => progress === number
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  const currentProgress = () => clamp(Math.ceil(100 / NUMBER_OF_QUESTIONS) * progress, 0, 100)
  const lastPage = () => progress === NUMBER_OF_QUESTIONS
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
    navigate('/', { state: { detectedLevel: level } })
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
      return !!years
    }
    if (progress === 2) {
      return !!canDoJump
    }
    if (progress === 3) {
      return true
    }
    if (progress === 4) {
      return true
    }
    return true
  }

  return (
    <CommonPage title="   PK SkillWizard" headerAktions={<AutoFixNormalIcon />} showHome={false}>

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
        {isActive(2) && <YesNoQuestion question={jumpQuestion} onSelect={setCanDoJump} currentValue={canDoJump} />}
        {isActive(3) && <MultiSelectionQuestion question={knownMovesQuestion} options={knownMovesOptions} onSelect={setKnowMoves} currentValues={knowMoves} />}
        {isActive(4) && <YesNoQuestion question={cleanQuestion} onSelect={setcanDoCleanMoves} currentValue={canDoCleanMoves} />}
        {isActive(5) && <SliderQuestion question={standingJumpQuestion} options={standingJumpQuestionOptions} currentValue={standingJumpCount} onSelect={setStandingJumpCount} />}
        {isActive(6) && <SliderQuestion question={pushupsQuestion} options={pushupsQuestionOptions} currentValue={pushUpCount} onSelect={setPushUpCount} />}
        {isActive(7) && <SliderQuestion question={stickQuestion} options={stickQuestionOptions} currentValue={correctStickCount} onSelect={setCorrectStickCount} />}
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
