import * as React from 'react'

import Stack from '@mui/material/Stack'

import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { getAllChallenges } from '../../../data/challenge'
import ChallengeCard from '../challenge/ChallengeCard'
import DifficultyLegend from './DifficultyLegend'

const Challenge = ({ spot }) => {
  const challenges = getAllChallenges()

  const spotChallenges = challenges.filter((challenge) => spot.challenges.includes(challenge.id))

  return (
    <>
      <Typography
        variant="h5"
        textAlign="center"
      >
        Spot Challenges
      </Typography>

      <Stack sx={{ flex: '1 1 auto', justifyContent: 'space-between', minHeight: 0 }}>
        <Stack spacing={2} direction="column" sx={{ mt: 3, overflow: 'auto', height: '100%' }}>
          {spotChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </Stack>

        <DifficultyLegend />
      </Stack>
    </>
  )
}

Challenge.propTypes = {
  spot: PropTypes.shape({
    challenges: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
}

export default Challenge
