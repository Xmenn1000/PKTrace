import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import mapboxgl from 'mapbox-gl'

// example code from https://docs.mapbox.com/mapbox-gl-js/guides/add-your-data/markers/

const Marker = ({ map, coordinates, data }) => {
  const markerRef = useRef()
  const markerElementRef = useRef(document.createElement('div'))

  // initialize the marker when the component mounts
  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({
      element: markerElementRef.current
    })
      .setLngLat(coordinates)
      .addTo(map)

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
        <div className="custom-marker">
          <img src="path/to/marker.png" alt={data.city} style={{ width: '32px', height: '32px' }} />
          <span className="marker-label">{data.city}</span>
        </div>,
        markerElementRef.current
      )}
    </>
  )
}
