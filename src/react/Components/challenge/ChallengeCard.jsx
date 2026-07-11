import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { difficultyColors } from '../../../data/challenge'

const ChallengeCard = ({ challenge, sx }) => {
  const navigate = useNavigate()

  return (

    <Button
      variant="contained"
      sx={{
        backgroundColor: difficultyColors[challenge.level],
        ...sx
      }}
      onClick={() => navigate(`/challenge/${challenge.id}`)}
    >
      {challenge.title}
    </Button>)
}
ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired
  }).isRequired,
  sx: PropTypes.object
}

export default ChallengeCard
