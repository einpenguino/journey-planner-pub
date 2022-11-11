/* global google*/
import React, {useEffect, useMemo, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, TrafficLayer} from '@react-google-maps/api'
import usePlacesAutocomplete,{ getGeocode, getLatLng} from 'use-places-autocomplete'
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import PlacesAutocomplete from './PlacesAutocomplete.js'
import './Map.css'
// import iconMap from '../icons/Icons.js'
import cloudIcon from '../icons/svg/wi-cloud.svg'

function Map({stationsData}) {
  const [selected, setSelected] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const cloudSVG = `M4.61,16.88c0-1.15,0.36-2.17,1.08-3.07c0.72-0.9,1.63-1.48,2.74-1.73c0.31-1.37,1.02-2.49,2.11-3.37s2.35-1.32,3.76-1.32
	c1.38,0,2.61,0.43,3.69,1.28s1.78,1.95,2.1,3.29h0.33c0.9,0,1.73,0.22,2.49,0.65s1.37,1.03,1.81,1.79c0.44,0.76,0.67,1.58,0.67,2.48
	c0,0.88-0.21,1.7-0.63,2.45s-1,1.35-1.73,1.8c-0.73,0.45-1.54,0.69-2.41,0.72H9.41c-1.34-0.06-2.47-0.57-3.4-1.53
	C5.08,19.37,4.61,18.22,4.61,16.88z M6.32,16.88c0,0.87,0.3,1.62,0.9,2.26s1.33,0.98,2.19,1.03h11.19c0.86-0.04,1.59-0.39,2.19-1.03
	c0.61-0.64,0.91-1.4,0.91-2.26c0-0.88-0.33-1.63-0.98-2.27c-0.65-0.64-1.42-0.96-2.32-0.96H18.8c-0.11,0-0.17-0.06-0.17-0.18
	l-0.07-0.57c-0.11-1.08-0.58-1.99-1.4-2.72c-0.82-0.73-1.77-1.1-2.86-1.1c-1.09,0-2.05,0.37-2.85,1.1
	c-0.81,0.73-1.27,1.64-1.37,2.72l-0.08,0.57c0,0.12-0.07,0.18-0.2,0.18H9.27c-0.84,0.1-1.54,0.46-2.1,1.07S6.32,16.05,6.32,16.88z`
  const svgMarker = {
    path:cloudSVG, 
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    // anchor: new google.maps.Point(15, 30),
  }
  const center = useMemo(() => (
    {lat:1.352,
      lng:103.82
    }
    ), [])

  const genMarkers = (stationsData) => {
    if (stationsData !== null) {
      let markerArr = []
      // console.log(stationsData['S08'].value)
      for (let pin in stationsData){
        let position = {
          lat: stationsData[pin].lat,
          lng: stationsData[pin].lng
        }
        let rainMM = String(stationsData[pin].value)
        // let svg = rainMM > 0.5 ? iconMap().rain : iconMap().clear 
        // console.log(svg)
        // let markerSymbol = new google.maps.SymbolPath(cloudSVG)
        markerArr.push(
          // <Marker position={position} key={pin} icon={'https://cdn-icons-png.flaticon.com/512/116/116251.png'}/>
          <Marker 
          position={position} 
          key={pin} 
          label={rainMM} 
          title={`${stationsData[pin].address}, ${rainMM}mm Rain`} 
          opacity={0.8}
          optimized={true}
          icon={svgMarker}
          // icon={{
          //   // url:{svg},
          //   url:{cloudIcon},
          //   scaledSize:new google.maps.Size(25,25)
          // }}
          
          
          // className='Markers'
          />
        )
        }
        return markerArr
      }
    }

  // const genRoute = async () => {
  //   if (selected !== null) {
  //     // eslint-disable-next-line no-undef
  //     const directionsService = new google.maps.DirectionsService()
  //     // const results = await directionsService.route
  //     const results = await directionsService.route({
  //       origin: selected[0],
  //       destination: selected[1],
  //       // eslint-disable-next-line no-undef
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     setDirectionsResponse(results)
  //     console.log(results)
  //     setDistance(results.routes[0].legs[0].distance.text)
  //     setDuration(results.routes[0].legs[0].duration.text)
  //   }
  // }

  const genRoute = async () => {
    if (selected !== null) {
      const directionsService = new google.maps.DirectionsService()
      // const results = await directionsService.route
      const results = await directionsService.route({
        origin: selected[0],
        destination: selected[1],
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      console.log(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance(null)
    setDuration(null)
    setSelected(null)
  }

    useEffect(() => {
      console.log(selected)
      // console.log(isNaN(selected))
      if(selected == null) clearRoute()
      genRoute()
    }, [selected])

    return (
      <>
        <div>
          <PlacesAutocomplete setSelected = {setSelected}/>
        </div>
        <GoogleMap zoom={12.25} center={center} mapContainerClassName="map-container">
          {/* <Marker position={center} /> */}
          {genMarkers(stationsData)}
          {directionsResponse? <DirectionsRenderer directions={directionsResponse}/> : null}
          <TrafficLayer/>
        </GoogleMap>
      </>
    )
}

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: {status, data},
//     clearSuggestions
//   } = usePlacesAutocomplete();

//   // Return Comboxbox
//   return 
// }



export default function GMap({stationsData}) {
  const gmapsLibraries = ['places']
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GKEY,
    libraries:['places']
    // region:'SG'
  });

  

  if (loadError) return <div>Loading!</div>
  return isLoaded ? <Map stationsData={stationsData}/> : <div>Loading!</div>
}

