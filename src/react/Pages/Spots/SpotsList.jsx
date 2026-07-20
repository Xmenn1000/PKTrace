import React from 'react'
import { Typography, List, ListItem, ListItemText, ListItemButton, Chip, Avatar, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDataBase } from '../../../hooks/useDataBase'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'

const SpotsList = () => {
  const db = useDataBase()
  const spots = db.spots.getAll()
  const { user } = useUser()

  const calculateNumCompletedChallenges = (singleSpot) => {
    let count = 0
    singleSpot.challenges.forEach((challengeId) => {
      if (user.doneChallenges.find(doneChallenge => doneChallenge.challengeId === challengeId)) {
        count += 1
      }
    })
    return count
  }

  return (

    <CommonPage title="Trainingsspots" backUrl="/start">

      <Typography variant="h6" textAlign="center">
        Suche dir einen Spot aus
      </Typography>
      <List sx={{
        width: '100%',
        maxWidth: 360,
        overflow: 'auto',
        flex: '1 1 0',
        minHeight: 0,
        scrollbarWidth: 'none'
      }}
      >
        {spots.map((singleSpot) => {
          const numAbsolved = calculateNumCompletedChallenges(singleSpot)
          return (
            <ListItem key={singleSpot.title} disablePadding sx={{ border: '1px solid', mb: 1, borderRadius: 2, overflow: 'hidden' }}>

              <ListItemButton
                component={Link}
                to={`/spot/${singleSpot.id}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <ListItemText primary={singleSpot.title} />

                {numAbsolved > 0 && (
                <Chip
                  color="primary"
                  size="small"
                  avatar={
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 'auto',
                        minWidth: 32,
                        height: 24,
                        px: 0.75,
                        borderRadius: 999,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: 'transparent',
                        color: 'inherit',
                        border: '1px solid',
                        borderColor: 'currentColor',
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {numAbsolved}
                      /
                      {singleSpot.challenges.length}
                    </Avatar>
                  }
                  label="Absolviert"
                />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </CommonPage>
  )
}

export default SpotsList
