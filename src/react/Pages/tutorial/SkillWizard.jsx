import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router-dom'

import { Typography, Button, Divider, LinearProgress } from '@mui/material'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import SingleSelectionQuestion from '../../Components/skillWizard/SingleSelectionQuestion'
import YesNoQuestion from '../../Components/skillWizard/YesNoQuestion'
import SkillLevel from './level'
import { cleanQuestion,
  jumpQuestion,
  knownMovesQuestion,
  pushupsQuestion,
  standingJumpQuestion,
  stickQuestion,
  yearQuestion } from '../../../data/questions'
import MultiSelectionQuestion from '../../Components/skillWizard/MultiSelectionQuestion'
import SliderQuestion from '../../Components/skillWizard/SliderQuestion'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'

// https://mui.com/material-ui/react-progress/
const NUMBER_OF_QUESTIONS = 7

const SkillWizard = () => {
  const navigate = useNavigate()
  const { setSkillLevel } = useUser()
  // one based
  const [progress, setprogress] = useState(1)

  const [questions, setQuestionAnswers] = useState(() => {
    try {
      return new Map(JSON.parse(localStorage.getItem('questions')))
    } catch {
      return new Map()
    }
  })

  const setQuestion = (id, answer) => {
    const newQuestions = new Map(questions)

    newQuestions.set(id, answer)

    setQuestionAnswers(newQuestions)
  }

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(Array.from(questions.entries())))
  }, [questions])

  const years = questions.get(yearQuestion.id) ?? ''
  const canDoJump = questions.get(jumpQuestion.id) ?? ''
  const canDoCleanMoves = questions.get(cleanQuestion.id) ?? ''
  const knowMoves = questions.get(knownMovesQuestion.id) ?? []
  const standingJumpCount = questions.get(standingJumpQuestion.id) ?? ''
  const pushUpCount = questions.get(pushupsQuestion.id) ?? ''
  const correctStickCount = questions.get(stickQuestion.id) ?? ''

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
        {isActive(1) && <SingleSelectionQuestion question={yearQuestion.question} options={yearQuestion.options} currentValue={years} onSelect={(value) => setQuestion(yearQuestion.id, value)} />}
        {isActive(2) && <YesNoQuestion question={jumpQuestion.question} currentValue={canDoJump} onSelect={(value) => setQuestion(jumpQuestion.id, value)} />}
        {isActive(3) && <MultiSelectionQuestion question={knownMovesQuestion.question} options={knownMovesQuestion.options} currentValues={knowMoves} onSelect={(value) => setQuestion(knownMovesQuestion.id, value)} />}
        {isActive(4) && <YesNoQuestion question={cleanQuestion.question} currentValue={canDoCleanMoves} onSelect={(value) => setQuestion(cleanQuestion.id, value)} />}
        {isActive(5) && <SliderQuestion question={standingJumpQuestion.question} options={standingJumpQuestion.options} currentValue={standingJumpCount} onSelect={(value) => setQuestion(standingJumpQuestion.id, value)} />}
        {isActive(6) && <SliderQuestion question={pushupsQuestion.question} options={pushupsQuestion.options} currentValue={pushUpCount} onSelect={(value) => setQuestion(pushupsQuestion.id, value)} />}
        {isActive(7) && <SliderQuestion question={stickQuestion.question} options={stickQuestion.options} currentValue={correctStickCount} onSelect={(value) => setQuestion(stickQuestion.id, value)} />}
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
