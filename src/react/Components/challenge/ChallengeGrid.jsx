import React from 'react'
import Grid from '@mui/material/Grid2'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import ChallengeCard from './ChallengeCard'

const ChallengeGrid = ({ challenges }) => (

  <Box sx={{
    maxHeight: 180,
    overflowY: 'auto',
    scrollbarWidth: 'none'
  }}
  >
    <Grid container rowSpacing={2} columnSpacing={2}>
      {challenges.map((singleChallenge) => (
        <Grid size={6} key={singleChallenge.id}>
          <ChallengeCard challenge={singleChallenge} sx={{ width: '100%', height: '100%' }} />
        </Grid>
      ))}
    </Grid>
  </Box>
)

ChallengeGrid.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired
  })).isRequired
}

export default ChallengeGrid
