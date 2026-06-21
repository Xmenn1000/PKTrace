import React, { useEffect, useState } from 'react'

const useGeoLocation = () => {
    const [watchId, setWatchId] = useState();
    const [latitude, setLat] = useState('52.45')
    const [longitude, setLong] = useState('13.52')
    const [error, setError] = useState(false)


    const getGeoLocation = () => {
        return new Promise((resolve, reject) => {
            const newId = navigator.geolocation.watchPosition((position, error) => {
                const lat = position.coords.latitude
                const long = position.coords.longitude
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                // console.log(lat, long);
                resolve(position)
            })
        })
    }

    useEffect(() => {
        const run = async () => {
            try {
                const position = await getGeoLocation();
                setWatchId(position)
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
                // console.log(position)
            }
            catch (e) {
                console.log(e)
                setLocationError(true)
            }      // console.log(position)
        }
        run()

        return () => navigator.geolocation.clearWatch(watchId);
    }, [])


    return {
        watchId,
        longitude,
        latitude,
        error
    }
}
export default useGeoLocation