import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import parkourImg from '../../../assets/MarkerGimp.png'

// example code from https://docs.mapbox.com/mapbox-gl-js/guides/add-your-data/markers/

const Marker = ({ map, coordinates, spot, onSelect }) => {
  const markerRef = useRef()
  const markerElementRef = useRef(document.createElement('div'))

  const handleClick = () => {
    map.current.flyTo({
      center: [spot.lng, spot.lat],
      zoom: spot.zoom
    })

    onSelect(spot)
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
        // https://stackoverflow.com/questions/50264638/how-to-disable-the-hover-effect-of-material-ui-button-inside-of-a-styled-compone
        // https://mui.com/material-ui/api/button/

        <Button
          onClick={handleClick}
          style={{ backgroundColor: 'transparent' }}
          disableRipple
          sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <img src={parkourImg} alt={spot.id} width={40} height={50} />
        </Button>,
        markerElementRef.current
      )}
    </>
  )
}

Marker.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  spot: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Marker
