import React, { useCallback, useEffect, useState } from 'react'

const useGeoLocation = () => {
  const [latitude, setLat] = useState()
  const [longitude, setLong] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getGeoLocation = useCallback(() => new Promise((resolve, reject) => {
    setLat(undefined)
    setLong(undefined)
    setLoading(true)
    function successCallBack(geoLocationPos) {
      const crd = geoLocationPos.coords
      setLat(crd.latitude)
      setLong(crd.longitude)
      setError(false)
      resolve(geoLocationPos)
      setLoading(false)
    }

    function errorCallBack(err) {
      console.warn(`ERROR (${err.code}): ${err.message}`)
      setError(true)
      reject(err)
      setLoading(false)
    }

    navigator.geolocation.getCurrentPosition(
      successCallBack,
      errorCallBack,
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }), [])

  return {
    getGeoLocation,
    longitude,
    latitude,
    error,
    loading
  }
}
export default useGeoLocation
