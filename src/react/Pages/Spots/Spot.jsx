import React, { useEffect, useState } from 'react'
import { Stack, Tooltip, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material'
import { useParams, useSearchParams } from 'react-router-dom'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MapIcon from '@mui/icons-material/Map'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { useDataBase } from '../../../hooks/useDataBase'
import Map from '../../Components/map/Map'
import Challenges from '../../Components/challenges/Challenges'
import PhotoGallery from '../../Components/photos/PhotoGallery'
import CommonPage from '../Layouts/CommonPage'

const Spot = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: 'map' })

  const currentScreen = searchParams.get('tab') ?? 'map'
  const [currentSpot, setCurrentSpot] = useState(undefined)

  const setCurrentScreen = (screen) => setSearchParams({ tab: screen })

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
    <CommonPage title="Trainingsspot" subtitle={currentSpot?.title} backUrl="/spots">
      <ToggleButtonGroup
        value={currentScreen}
        exclusive
        color="primary"
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{ width: '100%', marginBottom: '10px' }}
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

        {isActive('challenges') && currentSpot && (<Challenges spot={currentSpot} />)}

        {isActive('photos') && <PhotoGallery />}
      </Stack>

    </CommonPage>
  )
}

export default Spot
