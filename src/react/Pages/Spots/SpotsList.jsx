import React from 'react'
import { Stack, Typography, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'
import { useDataBase } from '../../../hooks/useDataBase'

const SpotsList = () => {
  const db = useDataBase()
  const spots = db.spots.getAll()

  return (<Stack
    flex="1 1 auto"
    justifyContent="space-between"
    alignItems="center"
    width={320}
    sx={{ paddingY: 2 }}
  >
    <Stack width="100%" spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          Trainingsspots
        </Typography>
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
      <Typography variant="h6" textAlign="center">
        Suche dir einen Spot aus
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, overflow: 'auto', flex: '1 1 0', minHeight: 0 }}>
        {spots.map((singleSpot) => (
          <ListItem key={singleSpot.title} disablePadding sx={{ border: '1px solid', mb: 1, borderRadius: 2, overflow: 'hidden' }}>
            <ListItemButton LinkComponent={Link} to={`/spot/${singleSpot.id}`}>
              <ListItemText primary={singleSpot.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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

export default SpotsList
