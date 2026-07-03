import React from 'react'
import { Stack, Typography, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDataBase } from '../../../hooks/useDataBase'
import CommonPage from '../CommonPage'

const SpotsList = () => {
  const db = useDataBase()
  const spots = db.spots.getAll()

  return (

    <CommonPage title="Trainingsspots" backUrl="/">

      <Stack
        width="100%"
        justifyContent="start"
        alignItems="center"
        flex="1 1 auto"
        sx={{ marginBottom: '5px' }}
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
    </CommonPage>
  )
}

export default SpotsList
