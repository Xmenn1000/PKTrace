import React from 'react'

import GeoInfo from './GeoForm'
import WeatherGraph from './WeatherGraph'

import useWeather from '../hooks/useWeather'
import useGeoLocation from '../hooks/useGeoLocation'

const Home = () => {
  const { watchId, longitude, latitude, error: locationError } = useGeoLocation()
  const { loading, weather } = useWeather(latitude, longitude, 3000)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <h1>
        Welcome to the best Weather-App on the internet.
      </h1>
      <div
        style={{
          width: '66%',
          padding: '15px',
          marginBottom: '10px',
          background: '#89cff0',
          borderRadius: '15px'
        }}
      >
        <h3 style={{ margin: 0 }}>
          The current weather is:
        </h3>
        {
          locationError && <b style={{ color: 'red' }}>Could not get geolocation</b>
        }
        {
          loading
          && <b>Loading ...</b>
        }
        {
          (!loading && weather)
          && <WeatherGraph weather={weather} />
        }
      </div>
      <GeoInfo
        lat={latitude}
        long={longitude}
      />
    </div>
  )
}

export default Home
