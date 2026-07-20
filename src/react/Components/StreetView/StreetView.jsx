import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Viewer } from 'mapillary-js'
import 'mapillary-js/dist/mapillary.css'

const StreetView = ({ lat, lng }) => {
  const key = process.env.STREET_VIEW_KEY
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [currentImgId, setCurrentImgId] = useState(null)

  useEffect(() => {
    const url = `https://graph.mapillary.com/images?access_token=${key}&fields=id,geometry,captured_at,compass_angle&lat=${lat}&lng=${lng}&radius=50&limit=10`
    const load = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        const result = await response.json()
        const first = result?.data?.[0]
        if (first) setCurrentImgId(first.id)
      } catch (error) {
        console.error(error.message)
      }
    }
    load()
  }, [lat, lng, key])

  useEffect(() => {
    if (!currentImgId) return
    if (!viewerRef.current) {
      viewerRef.current = new Viewer({
        accessToken: key,
        container: containerRef.current,
        imageId: currentImgId
      })
    } else {
      viewerRef.current.moveTo(currentImgId).catch((e) => console.error(e))
    }
  }, [currentImgId, key])

  useEffect(() => () => {
    if (viewerRef.current) {
      viewerRef.current.remove()
      viewerRef.current = null
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

StreetView.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default StreetView
