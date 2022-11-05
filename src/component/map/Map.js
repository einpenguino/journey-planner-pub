import React, {useMemo} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'

function Map({stationsData}) {
  const center = useMemo(() => (
    {lat:1.352,
      lng:103.82
    }
    ), [])

  const genMarkers = (stationsData) => {
    if (stationsData !== null) {
      let markerArr = []
      for (let pin in stationsData){
        let position = {
          lat: stationsData[pin].lat,
          lng: stationsData[pin].lng
        }
        markerArr.push(
          <Marker position = {position}/>
        )
        }
        return markerArr
    }
  }


    return (
      <GoogleMap zoom={12.6} center={center} mapContainerClassName="map-container">
        {/* <Marker position={center} /> */}
        {genMarkers(stationsData)}
      </GoogleMap>
    )
}

export default function GMap({stationsData}) {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GKEY
  });

  if (!isLoaded) return <div>Loading!</div>
  return <Map stationsData={stationsData}/>;
}

