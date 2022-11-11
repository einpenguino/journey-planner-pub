/* global google*/
import React, {useEffect, useMemo, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, DirectionsRenderer, TrafficLayer, BicyclingLayer, TransitLayer} from '@react-google-maps/api'
import usePlacesAutocomplete,{ getGeocode, getLatLng} from 'use-places-autocomplete'
import PlacesAutocomplete from '../autocomplete/PlacesAutocomplete.js'
import { iconsObj } from '../icons/Icons.js';

function Map({stationsData}) {
  const [selected, setSelected] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const [travelMode, setTravelMode] = useState('driving')
  const [mapLayer, setMapLayer] = useState(<TrafficLayer />)
  const {cloudSVG, rainSVG} = iconsObj
  const center = useMemo(() => (
    {
      lat:1.352,
      lng:103.82
    }
    ), [])

  const defaultTravelOptions = {
    driving:[google.maps.TravelMode.DRIVING, <TrafficLayer/>],
    bicycling:[google.maps.TravelMode.BICYCLING, <BicyclingLayer/>],
    transit:[google.maps.TravelMode.TRANSIT, <TransitLayer/>],
    walking:[google.maps.TravelMode.WALKING, <TransitLayer/>]
  }

  function selectTravelMode (travelMode) {
    setTravelMode(travelMode)
    setMapLayer(defaultTravelOptions[travelMode])
  }

  function colorSelect (rainMM) {
    if (rainMM > 0){
      // Light Rain, Yellow
      if (rainMM < 0.5) return 'rgb(255,255,0)'
      // Moderate Rain, orange
      else if (rainMM >= 0.5 && rainMM < 1) return 'rgb(255,128,0)'
      // Heavy Rain, red
      else if (rainMM >= 1 && rainMM < 1.5) return 'rgb(255,0,0)'
      // Heavy Rain, purple
      else if (rainMM >= 1.5) return 'rgb(255,0,255)'
    }
    // All ok / down, blue
    else return 'blue'
  }

  const genMarkers = (stationsData) => {
    if (stationsData !== null) {
      let markerArr = []
      for (let pin in stationsData){
        let position = {
          lat: stationsData[pin].lat,
          lng: stationsData[pin].lng
        }
        let rainMM = stationsData[pin].value
        let svgMarker = {
          path:(rainMM > 0 ? rainSVG:cloudSVG), 
          fillColor: colorSelect(rainMM),
          fillOpacity: 1,
          strokeWeight: 1,
          // strokeColor:'green',
          rotation: 0,
          scale: 1.3,
          labelOrigin: new google.maps.Point(15, 2),
          anchor: new google.maps.Point(17, 20),
        }
        markerArr.push(
          <Marker 
          position={position} 
          key={pin} 
          label={{
            fontWeight:'bold',
            text:String(rainMM.toFixed(1)),
            // anchor:new google.maps.Point(0, 0)
          }} 
          title={`${stationsData[pin].address}, ${rainMM}mm Rain`} 
          opacity={1}
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

  const genRoute = async () => {
    if (selected !== null) {
      const directionsService = new google.maps.DirectionsService()
      // const results = await directionsService.route
      const results = await directionsService.route({
        origin: selected[0],
        destination: selected[1],
        travelMode: defaultTravelOptions[travelMode][0]
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

    // useEffect(() => {
    //   console.log(distance)
    //   console.log(duration)
      
    // }, [distance, duration])

    return (
      <>
        <PlacesAutocomplete
        setSelected={setSelected}
        selectTravelMode={selectTravelMode}
        id='navContainer'
        distance={distance}
        duration={duration}
        />
        <GoogleMap zoom={12.25} center={center} mapContainerClassName="map-container">
          {/* <Marker position={center} /> */}
          {genMarkers(stationsData)}
          {directionsResponse? <DirectionsRenderer directions={directionsResponse}/> : null}
          {mapLayer}
        </GoogleMap>
      </>
    )
}

export default function GMap({stationsData, libraries}) {
  // const gmapsLibraries = ['places']
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GKEY,
    libraries:libraries
  });

  // if (loadError) return <div>Loading!</div>
  return isLoaded ? <Map stationsData={stationsData}/> : <div>Loading!</div>
}

