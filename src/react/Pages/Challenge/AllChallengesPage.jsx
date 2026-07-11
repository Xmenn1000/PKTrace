import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, Typography } from '@mui/material'

import CommonPage from '../Layouts/CommonPage'
import { getAllChallenges, difficultyColors } from '../../../data/challenge'
import ChallengeGrid from '../../Components/challenge/ChallengeGrid'

const AllChallengePage = () => {
  const challenges = getAllChallenges()

  return (
    <CommonPage
      title="Alle Challenges"
      subtitle="Wähle eine Challenge aus"
      backUrl="/start"
    >
      <ChallengeGrid challenges={challenges} />
    </CommonPage>
  )
}

export default AllChallengePage
