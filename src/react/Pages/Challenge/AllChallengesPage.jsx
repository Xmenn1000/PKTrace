import React from 'react'

import { Stack } from '@mui/system'
import CommonPage from '../Layouts/CommonPage'
import { getAllChallenges } from '../../../data/challenge'
import ChallengeGrid from '../../Components/challenge/ChallengeGrid'
import DifficultyLegend from '../../Components/challenges/DifficultyLegend'

const AllChallengePage = () => {
  const challenges = getAllChallenges()

  return (
    <CommonPage
      title="Alle Challenges"
      subtitle="Wähle eine Challenge aus"
      backUrl="/start"
    >
      <Stack sx={{ flex: '1 1 auto', justifyContent: 'space-between', minHeight: 0 }}>
        <ChallengeGrid challenges={challenges} />
        <DifficultyLegend />
      </Stack>
    </CommonPage>
  )
}

export default AllChallengePage
