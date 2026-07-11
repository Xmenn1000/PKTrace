import React, { useMemo, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useUser } from '../../../hooks/useUser'
import PhotoGallery from '../photos/PhotoGallery'
import Stopwatch from '../stopwatch/Stopwatch'
import { getChallengeById } from '../../../data/challenge'

const ChallengeOverview = ({ id = undefined, descriptions = [], images = [], commentSection }) => {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [timeElapsedMilliSeconds, setTimeElapsedMilliSeconds] = useState(0)
  const { user, addDoneChallenge } = useUser()
  const currentDescription = descriptions[currentDescriptionIndex]
  // Use num negative for left, positive for right
  const handleNextDescription = (num) => {
    setCurrentDescriptionIndex(prev => {
      const next = prev + num

      if (next < 0) {
        return prev
      }

      if (next >= descriptions.length) {
        return prev
      }

      return next
    })
  }

  const handleStart = () => {
    setStarted(true)
  }

  const handleFinish = () => {
    setStarted(false)
    if (timeElapsedMilliSeconds > 0) {
      addDoneChallenge(id, timeElapsedMilliSeconds)
    }
  }

  const handleCancel = () => {
    setStarted(false)
  }

  const getMinHeightOfLargestDescription = () => {
    let maxHeight = 0
    descriptions.forEach((description) => {
      maxHeight = Math.max(maxHeight, description.length)
    })
    return maxHeight
  }
  const descriptionMinHeight = getMinHeightOfLargestDescription()

  const showMultipleDescriptions = () => {
    if (descriptions.length > 1) {
      return (
        <div>
          <Typography textAlign="center" color="text.secondary" minHeight={descriptionMinHeight}>
            {currentDescription}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" onClick={() => handleNextDescription(-1)}>
              letzte Variante
            </Button>

            <Button variant="outlined" onClick={() => handleNextDescription(1)}>
              nächste Variante
            </Button>
          </Stack>
        </div>
      )
    }
    return (
      <Typography textAlign="center" color="text.secondary" minHeight={descriptionMinHeight}>
        {currentDescription}
      </Typography>
    )
  }

  const challenge = getChallengeById(id)

  if (!challenge) {
    throw new Error(`${id === undefined ? 'MISSING ID PROP!' : `The challenge ID: ${id} does not exist`}`)
  }

  const completedChallenge = useMemo(
    () => user?.doneChallenges?.find(
      elem => elem.challengeId === id
    ),
    [user?.doneChallenges, id]
  )

  const absolvedChallengeText = useMemo(() => {
    if (!completedChallenge) {
      return null
    }

    const { recordTimeMillis, whenAccomplished } = completedChallenge

    const minutes = Math.floor(recordTimeMillis / 60000)
    const seconds = Math.floor((recordTimeMillis % 60000) / 1000)
    const millis = recordTimeMillis % 1000

    const formattedTime =
      `${minutes}:${seconds.toString().padStart(2, '0')}.${millis
        .toString()
        .padStart(3, '0')}`

    return `Du hast diese Challenge am ${new Date(
      whenAccomplished
    ).toLocaleString()} abgeschlossen. Deine Rekordzeit ist ${formattedTime}.`
  }, [completedChallenge])

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        scrollbarWidth: 'none'
      }}
    >
      <Stack spacing={2} alignItems="center">
        {showMultipleDescriptions()}
        <PhotoGallery images={images} sx={{ pb: 1 }} imageSx={{ height: 350, borderRadius: 4 }} />
        {started ? (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleFinish}>
              Finish
            </Button>

            <Button variant="outlined" color="error" onClick={handleCancel}>
              Abbrechen
            </Button>
          </Stack>
        ) : (
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>
        )}
        {absolvedChallengeText && (
          <Typography textAlign="center" color="text.secondary">
            {absolvedChallengeText}
          </Typography>
        )}
        {started && <Stopwatch onTimeElapsed={setTimeElapsedMilliSeconds} /> }
        {commentSection}
      </Stack>
    </Box>
  )
}

ChallengeOverview.propTypes = {
  id: PropTypes.number,
  descriptions: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired
  })),
  commentSection: PropTypes.node
}

export default ChallengeOverview
