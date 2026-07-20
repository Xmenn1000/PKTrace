import * as React from 'react'

import Stack from '@mui/material/Stack'

import PropTypes from 'prop-types'
import { getAllChallenges } from '../../../data/challenge'
import ChallengeCard from '../challenge/ChallengeCard'
import DifficultyLegend from './DifficultyLegend'

const Challenge = ({ spot }) => {
  const challenges = getAllChallenges()

  const spotChallenges = challenges.filter((challenge) => spot.challenges.includes(challenge.id))

  return (
    <>
      <h1>Spot Challenges</h1>

      <Stack sx={{ flex: '1 1 auto', justifyContent: 'space-between', minHeight: 0 }}>
        <Stack spacing={2} direction="column" sx={{ mt: 3 }}>
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
