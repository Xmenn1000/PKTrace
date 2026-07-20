import React from 'react'

const GeoInfo = ({ lat, long }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}
  >
    <div style={{ marginBottom: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '50px'
        }}
      >
        Lat:
      </span>
      <input
        type="text"
        value={lat}
      />
    </div>
    <div>
      <span
        style={{
          display: 'inline-block',
          width: '50px'
        }}
      >
        Long:
      </span>
      <input
        type="text"
        value={long}
      />
    </div>
  </div>
)

export default GeoInfo
