import React, { useEffect, useState } from 'react'
import { Stack, Typography, Divider, List, ListItem, ListItemText, Tooltip, ToggleButton, ListItemButton, ListItemIcon, ToggleButtonGroup, IconButton, Button, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import HomeIcon from '@mui/icons-material/Home'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MapIcon from '@mui/icons-material/Map'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { useDataBase } from '../../../hooks/useDataBase'
import spots from '../../../data/SpotsData.json'
import Map from '../../Components/map/Map'
import Challenges from '../../Components/challenges/Challenges'
import PhotoGallery from '../../Components/photos/PhotoGallery'

const Spot = () => {
  const [currentScreen, setCurrentScreen] = useState('map')
  const [currentSpot, setCurrentSpot] = useState(undefined)

  const isActive = (screen) => currentScreen === screen

  const db = useDataBase()
  const params = useParams()

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setCurrentScreen(newAlignment)
    }
  }

  useEffect(() => {
    setCurrentSpot(db.spots.getById(Number(params.spotId)))
  }, [])

  return (
    <Stack
      flex="1 1 auto"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      width={320}
      minHeight={0}
    >
      <Stack width="100%" spacing={1}>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <IconButton component={Link} to="/spots">
            <ArrowBackIcon />
          </IconButton>
          <Stack>
            <Typography variant="h5" textAlign="center">
              Trainingsspot
            </Typography>
            <Typography variant="h6" textAlign="center">
              {currentSpot?.title}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderBottomWidth: 5, width: '100%' }} />
      </Stack>

      <Stack
        width="100%"
        flex="1 1 auto"
        minHeight={0}
      >
        <ToggleButtonGroup
          value={currentScreen}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{ width: '100%' }}
          size="small"
        >
          <Tooltip title="Map">
            <ToggleButton value="map" aria-label="map" sx={{ flex: 1 }}>
              <MapIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Challenges">
            <ToggleButton value="challenges" aria-label="challenges" sx={{ flex: 1 }}>
              <EmojiEventsIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Photos">
            <ToggleButton value="photos" aria-label="photos" sx={{ flex: 1 }}>
              <PhotoLibraryIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Stack
          width="100%"
          minHeight={0}
          justifyContent="flex-start"
          alignItems="center"
          flex="3"
        >
          <Stack sx={{ display: isActive('map') ? 'flex' : 'none' }} flex="1 1 auto" width="100%" minHeight={0}>
            {currentSpot ? <Map spot={currentSpot} onSpotChange={setCurrentSpot} /> : <CircularProgress />}
          </Stack>
          {isActive('challenges') && <Challenges />}
          {isActive('photos') && <PhotoGallery />}
        </Stack>
      </Stack>

      <Stack spacing={1.5} sx={{ width: '100%' }}>
        <Divider sx={{ borderBottomWidth: 5, width: '100%', marginTop: '10px' }} />
        <IconButton component={Link} to="/">
          <HomeIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Spot
