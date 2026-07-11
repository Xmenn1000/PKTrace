import React from 'react'
import Grid from '@mui/material/Grid2'
import PropTypes from 'prop-types'
import ChallengeCard from './ChallengeCard'

const ChallengeGrid = ({ challenges }) => (

  <Grid container rowSpacing={2} columnSpacing={2}>
    {challenges.map((singleChallenge) => (
      <Grid size={6} key={singleChallenge.id}>
        <ChallengeCard challenge={singleChallenge} sx={{ width: '100%', height: '100%' }} />
      </Grid>
    ))}
  </Grid>
)

ChallengeGrid.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired
  })).isRequired
}

export default ChallengeGrid
