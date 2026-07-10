import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, Typography } from '@mui/material'

import CommonPage from '../Layouts/CommonPage'
import { challenges, difficultyColors } from '../../../data/challenge'

const AllChallengePage = () => {
  const navigate = useNavigate()

  return (
    <CommonPage
      title="Alle Challenges"
      subtitle="Wähle eine Challenge aus"
      backUrl="/"
    >
      <Stack spacing={2} width="100%">
        <Typography color="text.secondary" textAlign="center">
          Alle verfügbaren Challenges
        </Typography>

        {challenges.map((challenge) => (
          <Button
            key={challenge.id}
            variant="contained"
            sx={{
              backgroundColor: difficultyColors[challenge.level],
            }}
            onClick={() => navigate(`/challenge/${challenge.id}`)}
          >
            {challenge.title}
          </Button>
        ))}
      </Stack>
    </CommonPage>
  )
}

export default AllChallengePage