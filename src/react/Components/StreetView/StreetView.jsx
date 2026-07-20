import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Viewer } from 'mapillary-js'
import 'mapillary-js/dist/mapillary.css'
import { Card, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'

const StreetView = ({ lat, lng }) => {
  const key = process.env.STREET_VIEW_KEY
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [currentImgId, setCurrentImgId] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {

    const controller = new AbortController()

    const timoutId = setTimeout(() => {
      controller.abort()
      setStatus('error')
    }, 9000)

    const url = `https://graph.mapillary.com/images?access_token=${key}&fields=id,geometry,captured_at,compass_angle&lat=${lat}&lng=${lng}&radius=50&limit=10`
    const load = async () => {
      setStatus('loading')
      setCurrentImgId(null)
      try {
        const response = await fetch(url, {
          signal: controller.signal
        })
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        const result = await response.json()
        const first = result?.data?.[0]
        if (!first) {
          setStatus('error')
          return
        } 
          
        setCurrentImgId(first.id)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error.message)
        }
        setStatus('error')
      } finally {
        clearTimeout(timoutId)
      }
    }
    load()
  }, [lat, lng, key])

  useEffect(() => {
    if (!currentImgId || !containerRef.current) return

    const loadViewer = async () => {
      try {
        if (!viewerRef.current) {
          viewerRef.current = new Viewer({
            accessToken: key,
            container: containerRef.current,
            imageId: currentImgId
          })
        } else {
          await viewerRef.current.moveTo(currentImgId)
        }

        setStatus('ready')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    loadViewer()
  }, [currentImgId, key])

  useEffect(() => () => {
    if (viewerRef.current) {
      viewerRef.current.remove()
      viewerRef.current = null
    }
  }, [])

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          display: status === 'ready' ? 'flex' : 'none'
        }}
      />

      {status === 'loading' && (
        <Box>
          <CircularProgress />
          <Typography>Lädt...</Typography>
        </Box>
      )}

      {status === 'error' && (
          <Typography>
            Tut uns leid, aber diese Ressource kann für diesen Ort nicht geladen
            werden!
          </Typography>
      )}
    </Card>
  )
}

StreetView.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default StreetView
