import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { Button, Zoom } from '@mui/material'
import parkourImg from '../../assets/parkour.png'

// example code from https://docs.mapbox.com/mapbox-gl-js/guides/add-your-data/markers/

const Marker = ({ map, coordinates, spot }) => {
  const markerRef = useRef()
  const markerElementRef = useRef(document.createElement('div'))

  const handleClick = () => {
    map.current.flyTo({
      center: [spot.lng, spot.lat],
      zoom: spot.zoom
    })
  }

  // initialize the marker when the component mounts
  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({
      element: markerElementRef.current
    })
      .setLngLat(coordinates)
      .addTo(map.current)

    // remove the marker when the component unmounts
    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
  }, [])

  return (
    <>
      {createPortal(
        <Button onClick={handleClick}>
          <img src={parkourImg} alt={spot.id} width={32} height={32} />
        </Button>,
        markerElementRef.current
      )}
    </>
  )
}

export default Marker
