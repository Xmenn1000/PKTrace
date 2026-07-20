import React from 'react'

import CommonPage from '../Layouts/CommonPage'
import { getAllChallenges } from '../../../data/challenge'
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
