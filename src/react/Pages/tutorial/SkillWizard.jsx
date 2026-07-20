import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Stack, Typography, Button, LinearProgress } from '@mui/material'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import SingleSelectionQuestion from '../../Components/skillWizard/SingleSelectionQuestion'
import YesNoQuestion from '../../Components/skillWizard/YesNoQuestion'
import MultiSelectionQuestion from '../../Components/skillWizard/MultiSelectionQuestion'
import SliderQuestion from '../../Components/skillWizard/SliderQuestion'

import SkillLevel from './level'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'

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

import {
  getSingleSelectionPoints,
  knownMovesPoints,
  getSliderPoints
} from './calculating-functions'

const NUMBER_OF_QUESTIONS = 10

const SkillWizard = () => {
  const navigate = useNavigate()
  const { setSkillLevel } = useUser()

  const [progress, setProgress] = useState(1)

  const [questions, setQuestionAnswers] = useState(() => {
    try {
      const savedQuestions = localStorage.getItem('questions')

      if (!savedQuestions) {
        return new Map()
      }

      const parsedQuestions = JSON.parse(savedQuestions)

      return Array.isArray(parsedQuestions)
        ? new Map(parsedQuestions)
        : new Map()
    } catch {
      return new Map()
    }
  })

  const setQuestion = (key, answer) => {
    setQuestionAnswers((previousQuestions) => {
      const newQuestions = new Map(previousQuestions)

      newQuestions.set(key, answer)

      return newQuestions
    })
  }

  useEffect(() => {
    localStorage.setItem(
      'questions',
      JSON.stringify(Array.from(questions.entries()))
    )
  }, [questions])

  /*
   * Antworten aus der Map lesen.
   * Der Fragetext wird jeweils als eindeutiger Schlüssel verwendet.
   */
  const years = questions.get(yearQuestion) ?? ''
  const canDoJump = questions.get(jumpQuestion.question) ?? ''
  const knowMoves = questions.get(knownMovesQuestion) ?? []
  const canDoCleanMoves = questions.get(cleanQuestion.question) ?? ''

  const standingJumpCount =
    questions.get(standingJumpQuestion.question) ?? ''

  const pushUpCount =
    questions.get(pushupsQuestion.question) ?? ''

  const correctStickCount =
    questions.get(stickQuestion.question) ?? ''

  const conditionCount =
    questions.get(condiQuestion) ?? ''

  const canJumpHigh =
    questions.get(jumpHighQuestion.question) ?? ''

  const canCrouchBalance =
    questions.get(crouchBalance.question) ?? ''

  /*
   * Setter für die einzelnen Fragen.
   * Lesen und Speichern verwenden immer denselben Schlüssel.
   */
  const setYears = (answer) => {
    setQuestion(yearQuestion, String(answer))
  }

  const setCanDoJump = (answer) => {
    setQuestion(jumpQuestion.question, String(answer))
  }

  const setKnowMoves = (answer) => {
    setQuestion(knownMovesQuestion, answer)
  }

  const setCanDoCleanMoves = (answer) => {
    setQuestion(cleanQuestion.question, String(answer))
  }

  const setStandingJumpCount = (answer) => {
    setQuestion(standingJumpQuestion.question, answer)
  }

  const setPushUpCount = (answer) => {
    setQuestion(pushupsQuestion.question, answer)
  }

  const setCorrectStickCount = (answer) => {
    setQuestion(stickQuestion.question, answer)
  }

  const setConditionCount = (answer) => {
    setQuestion(condiQuestion, String(answer))
  }

  const setCanJumpHigh = (answer) => {
    setQuestion(jumpHighQuestion.question, answer)
  }

  const setCanCrouchBalance = (answer) => {
    setQuestion(crouchBalance.question, answer)
  }

  const isActive = (number) => progress === number

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
  }

  const currentProgress = () => {
    const percentage = Math.ceil(
      (100 / NUMBER_OF_QUESTIONS) * progress
    )

    return clamp(percentage, 0, 100)
  }

  const lastPage = () => progress === NUMBER_OF_QUESTIONS

  const calculateScore = () => {
    const yearPoints = getSingleSelectionPoints(
      yearOptions,
      years
    )

    const jumpPoints =
      canDoJump === 'yes'
        ? jumpQuestion.points
        : 0

    const cleanPoints =
      canDoCleanMoves === 'yes'
        ? cleanQuestion.points
        : 0

    const movesPoints = knownMovesPoints(
      knowMoves,
      knownMovesOptions
    )

    const standingJumpPoints = getSliderPoints(
      standingJumpQuestion,
      standingJumpCount
    )

    const pushUpPoints = getSliderPoints(
      pushupsQuestion,
      pushUpCount
    )

    const stickPoints = getSliderPoints(
      stickQuestion,
      correctStickCount
    )

    const conditionPoints = getSingleSelectionPoints(
      conditionOptions,
      conditionCount
    )

    const highJumpPoints = getSliderPoints(
      jumpHighQuestion,
      canJumpHigh
    )

    const crouchBalancePoints = getSliderPoints(
      crouchBalance,
      canCrouchBalance
    )

    return (
      yearPoints +
      jumpPoints +
      cleanPoints +
      movesPoints +
      standingJumpPoints +
      pushUpPoints +
      stickPoints +
      conditionPoints +
      highJumpPoints +
      crouchBalancePoints
    )
  }

  const calculateSkillLevel = (score) => {
    console.log('SkillWizard score:', score)

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
    if (progress < NUMBER_OF_QUESTIONS) {
      setProgress((previousProgress) => previousProgress + 1)
    }
  }

  const handleBackClick = () => {
    if (progress > 1) {
      setProgress((previousProgress) => previousProgress - 1)
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
    <CommonPage
      title="PK SkillWizard"
      headerAktions={<AutoFixNormalIcon />}
      showHome={false}
      showGoBack
    >
      <Stack width="100%" height="100%">
        <Stack
          width="100%"
          justifyContent="center"
          alignItems="center"
          flex="1 1 auto"
          sx={{
            py: 3
          }}
        >
          {isActive(1) && (
            <SingleSelectionQuestion
              question={yearQuestion}
              options={yearOptions}
              currentValue={years}
              onSelect={setYears}
            />
          )}

          {isActive(2) && (
            <YesNoQuestion
              question={jumpQuestion.question}
              currentValue={canDoJump}
              onSelect={setCanDoJump}
            />
          )}

          {isActive(3) && (
            <MultiSelectionQuestion
              question={knownMovesQuestion}
              options={knownMovesOptions}
              currentValues={knowMoves}
              onSelect={setKnowMoves}
            />
          )}

          {isActive(4) && (
            <YesNoQuestion
              question={cleanQuestion.question}
              currentValue={canDoCleanMoves}
              onSelect={setCanDoCleanMoves}
            />
          )}

          {isActive(5) && (
            <SliderQuestion
              question={standingJumpQuestion.question}
              options={standingJumpQuestion.options}
              currentValue={standingJumpCount}
              onSelect={setStandingJumpCount}
            />
          )}

          {isActive(6) && (
            <SliderQuestion
              question={pushupsQuestion.question}
              options={pushupsQuestion.options}
              currentValue={pushUpCount}
              onSelect={setPushUpCount}
            />
          )}

          {isActive(7) && (
            <SliderQuestion
              question={stickQuestion.question}
              options={stickQuestion.options}
              currentValue={correctStickCount}
              onSelect={setCorrectStickCount}
            />
          )}

          {isActive(8) && (
            <SingleSelectionQuestion
              question={condiQuestion}
              options={conditionOptions}
              currentValue={conditionCount}
              onSelect={setConditionCount}
            />
          )}

          {isActive(9) && (
            <SliderQuestion
              question={jumpHighQuestion.question}
              options={jumpHighQuestion.options}
              labels={jumpHighQuestion.labels}
              currentValue={canJumpHigh}
              onSelect={setCanJumpHigh}
            />
          )}

          {isActive(10) && (
            <SliderQuestion
              question={crouchBalance.question}
              options={crouchBalance.options}
              currentValue={canCrouchBalance}
              onSelect={setCanCrouchBalance}
            />
          )}
        </Stack>

        <Stack
          width="100%"
          spacing={1.5}
          sx={{
            p: '10px'
          }}
        >
          <Typography
            variant="body2"
            textAlign="center"
          >
            Schritt {progress} von {NUMBER_OF_QUESTIONS}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={currentProgress()}
            sx={{
              width: '100%',
              height: 10,
              borderRadius: 5
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-around"
          >
            <Button
              variant="contained"
              onClick={handleBackClick}
              disabled={progress === 1}
            >
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
    </CommonPage>
  )
}

export default SkillWizard