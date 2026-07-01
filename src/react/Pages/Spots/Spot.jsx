import React from 'react'
import { Stack, Typography, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import HomeIcon from '@mui/icons-material/Home'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDataBase } from '../../../hooks/useDataBase'
import spots from '../../../data/SpotsData.json'

const Spot = () => {
  const db = useDataBase()
  const params = useParams()

  const currentSpot = db.spots.getById(Number(params.spotId))
  console.log(params.spotId)
  console.log(currentSpot)

  return (
    <Stack
      flex="1 1 auto"
      justifyContent="space-between"
      alignItems="center"
      width={320}
      sx={{ paddingY: 2 }}
    >
      <Stack width="100%" spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <IconButton component={Link} to="/spots">
            <ArrowBackIcon />
          </IconButton>
          <Stack>
            <Typography variant="h4" textAlign="center">
              Trainingsspot
            </Typography>
            <Typography variant="h4" textAlign="center">
              {currentSpot.title}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderBottomWidth: 5, width: '100%' }} />
      </Stack>

      <Stack
        width="100%"
        justifyContent="start"
        alignItems="center"
        flex="1 1 auto"
        sx={{ paddingY: 3 }}
      >
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/challenges" variant="contained" color="primary">
            Challenges
          </Button>
          <Button component={Link} to={`/map?spotId=${currentSpot.id}`} variant="contained" color="primary">
            Karten Ansichtmap
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderBottomWidth: 5, width: '100%' }} />
      <Stack spacing={1.5}>
        <IconButton component={Link} to="/">
          <HomeIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Spot
