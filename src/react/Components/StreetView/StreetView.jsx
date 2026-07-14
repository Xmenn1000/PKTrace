import React, { useEffect, useState } from 'react'
import { Viewer } from 'mapillary-js'
import 'mapillary-js/dist/mapillary.css'

const StreetView = ({ lat, lng }) => {
  const key = process.env.STREET_VIEW_KEY
  const [currentImgId, setCurrentImgId] = useState()

  const url = `https://graph.mapillary.com/images?access_token=${key}&fields=id,geometry,captured_at,compass_angle&lat=${lat}&lng=${lng}&radius=50&limit=10`
  console.log(url)

  const fetchNewId = async (lng, lat) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.log('STATUS', response.status)
        throw new Error(`Response status: ${response.status}`)
      }

      const result = await response.json()
      console.log('JSON', result)
      return result
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const load = async () => {
      const result = await fetchNewId(lng, lat)

      console.log('RESULT', result)
      const newImageId = result.data[0].id
      console.log('FIRST ITEM', newImageId)
      setCurrentImgId(newImageId)
    }
    load()
  }, [lng, lat])

  class ViewerComponent extends React.Component {
    constructor(props) {
      super(props)
      this.containerRef = React.createRef()
    }

    componentDidMount() {
      this.viewer = new Viewer({
        accessToken: key,
        container: this.containerRef.current,
        imageId: currentImgId
      })
    }

    componentWillUnmount() {
      if (this.viewer) {
        this.viewer.remove()
      }
    }

    render() {
      return <div ref={this.containerRef} style={this.props.style} />
    }
  }

  return (

    <ViewerComponent
      accessToken={key}
      imageId={currentImgId}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default StreetView
