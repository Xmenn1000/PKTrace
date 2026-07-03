import React, { useEffect, useState } from 'react'
import { Stack, Typography, Divider, List, ListItem, ListItemText, Tooltip, ToggleButton, ListItemButton, ListItemIcon, ToggleButtonGroup, IconButton, Button } from '@mui/material'
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
      alignItems="center"
      width={320}
      minHeight={0}
      sx={{ paddingY: 2 }}
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
        sx={{ paddingY: 3 }}
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
      </Stack>

      <Stack
        flex="1 1 auto"
        width="100%"
        minHeight={0}
        justifyContent="center"
        alignItems="center"
      >
        {isActive('map') && <Map spot={currentSpot} onSpotChange={setCurrentSpot} />}
        {isActive('challenges') && <Challenges />}
        {isActive('photos') && <PhotoGallery />}
      </Stack>

      <Divider sx={{ borderBottomWidth: 5, width: '100%', marginTop: '10px' }} />
      <Stack spacing={1.5}>
        <IconButton component={Link} to="/">
          <HomeIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Spot
