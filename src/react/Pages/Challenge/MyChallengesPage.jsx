import React from 'react'
import { Stack, Typography } from '@mui/material'

import CommonPage from '../Layouts/CommonPage'
import ChallengeCard from '../../Components/challenge/ChallengeCard'
import { getAllChallenges } from '../../../data/challenge'
import { useUser } from '../../../hooks/useUser'

const MyChallengesPage = () => {
  const { user } = useUser()

  const allChallenges = getAllChallenges()
  const doneChallenges = user?.doneChallenges ?? []

  const completedChallenges = allChallenges.filter((challenge) =>
    doneChallenges.some(
      (doneChallenge) =>
        Number(doneChallenge.challengeId) === Number(challenge.id)
    )
  )

  return (
    <CommonPage
      title="Meine Challenges"
      subtitle="Deine abgeschlossenen Challenges"
      backUrl="/start"
    >
      <Stack spacing={2} width="100%">
        {completedChallenges.length === 0 ? (
          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Du hast bisher noch keine Challenge abgeschlossen.
          </Typography>
        ) : (
          completedChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />
          ))
        )}
      </Stack>
    </CommonPage>
  )
}

export default MyChallengesPage