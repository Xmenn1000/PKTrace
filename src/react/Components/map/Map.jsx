import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { Stack, IconButton, TextField, Autocomplete, createFilterOptions, Tooltip, useColorScheme, CircularProgress } from '@mui/material'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import ExploreIcon from '@mui/icons-material/Explore'
import { useDataBase } from '../../../hooks/useDataBase'
import Marker from './Marker'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import useGeoLocation from '../../../hooks/useGeoLocation'

const Map = ({ spot, onSpotChange }) => {
  const [center, setCenter] = useState([spot.lng, spot.lat])
  const [zoom, setZoom] = useState(spot.zoom)
  const [mapReady, setMapReady] = useState(false)
  const { mode } = useColorScheme()
  const { longitude, latitude, error: locationError, getGeoLocation, loading: loadingLocation } = useGeoLocation()

  const db = useDataBase()
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(
    () => {
      if (latitude == null || longitude == null) return
      mapRef.current.flyTo({ center: [longitude, latitude] })
    },
    [longitude, latitude]
  )

  const autocompleteChange = (newValue) => {
    if (newValue == null) return
    onSpotChange(newValue)
  }

  useEffect(
    () => {
      if (mapRef.current && spot) {
        flyToSpot(spot)
      }
    },
    [mapRef.current, spot]
  )

  const flyToSpot = (spot) => {
    mapRef.current.flyTo({ center: [spot.lng, spot.lat], zoom: spot.zoom })
  }

  const onGetGeoLocaton = () => {
    getGeoLocation()
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.MAPBOX_TOKEN,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [spot.lng, spot.lat],
      zoom: spot.zoom,
      pitch: 60,
      bearing: -17.6,
      config: {
        basemap: {
          lightPreset: mode === 'light' ? 'day' : 'night'
        }
      }
    })

    // // https://docs.mapbox.com/api/search/geocoding/
    // mapRef.current.addControl(
    //   new MapboxGeocoder({
    //     accessToken: process.env.MAPBOX_TOKEN,
    //     useBrowserFocus: true,
    //     mapboxgl,
    //     autocomplete: true,
    //     limit: 5,
    //     bbox: [13.088, 52.338, 13.761, 52.675],
    //     proximity: [13.4055, 52.5200]
    //   })
    // )

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })

    mapRef.current.on('load', () => setMapReady(true))

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const options = db.spots.getAll()

  const filterOptions = createFilterOptions({
    limit: 5
  })

  return (
    <Stack width="100%" flex="1 1 auto" minHeight={0}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" marginBottom="5px">
        <Autocomplete
          options={options}
          filterOptions={filterOptions}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Spots" />}
          onChange={(event, newValue) => {
            autocompleteChange(newValue)
          }}
        />
        <Tooltip title="Center on current Spot">
          <IconButton onClick={() => flyToSpot(spot)}>
            <ExploreIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <div className="sidebar">
        Longitude:
        {' '}
        {center[0].toFixed(4)}
        {' '}
        | Latitude:
        {' '}
        {center[1].toFixed(4)}
        {' '}
        | Zoom:
        {' '}
        {zoom.toFixed(2)}
      </div>
      <div style={{ position: 'relative', width: '100%', flex: '1 1 auto', minHeight: 0 }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', right: 5, top: 5 }}>
          {loadingLocation && <CircularProgress aria-label="Loading…" />}
          {!loadingLocation && <Tooltip title="find Location">
            <IconButton aria-label="mylocation" color="primary" onClick={() => onGetGeoLocaton()}>
              <MyLocationIcon />
            </IconButton>
          </Tooltip>}
        </div>
        {mapReady && db.spots.getAll().map((singleSpot) => (
          <Marker key={singleSpot.id} map={mapRef} coordinates={[singleSpot.lng, singleSpot.lat]} spot={singleSpot} onSelect={onSpotChange} />
        ))}
      </div>
      <Stack />
    </Stack>
  )
}

export default Map
