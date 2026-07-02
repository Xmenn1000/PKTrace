import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { Stack, Typography, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useSearchParams } from 'react-router-dom'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useDataBase } from '../../../hooks/useDataBase'
import Marker from './Marker'
import MarkerPopUp from './MarkerPopUp'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const INITIAL_CENTER = [13.4505, 52.5252]
const INITIAL_ZOOM = 15.62

const Map = ({ spot, onSpotChange }) => {
  const [currentSpot, setCurrentSpot] = useState(spot)
  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [searchParams] = useSearchParams()
  const [mapReady, setMapReady] = useState(false)

  const db = useDataBase()
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(
    () => {
      if (mapRef.current && spot) {
        mapRef.current.flyTo({ center: [spot.lng, spot.lat] })
      }
    },
    [mapRef.current]
  )

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.MAPBOX_TOKEN,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: 60,
      bearing: -17.6,
      config: {
        basemap: {
          colorBuildingHighlight: '#93C5FD',
          colorBuildingSelect: '#1E40AF',
          show3dLandmarks: false
        }
      }
    })

    // https://docs.mapbox.com/api/search/geocoding/
    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: process.env.MAPBOX_TOKEN,
        useBrowserFocus: true,
        mapboxgl,
        autocomplete: true,
        limit: 5,
        bbox: [13.088, 52.338, 13.761, 52.675],
        proximity: [13.4055, 52.5200]
      })
    )

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

  return (
    <Stack width="100%" flex="1 1 auto" minHeight={0}>
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
      <div id="map-container" ref={mapContainerRef} />
      {mapReady && db.spots.getAll().map((singleSpot) => (
        <Marker key={singleSpot.id} map={mapRef} coordinates={[singleSpot.lng, singleSpot.lat]} spot={singleSpot} onSelect={onSpotChange} />
      ))}
      <Stack />
    </Stack>
  )
}

export default Map
