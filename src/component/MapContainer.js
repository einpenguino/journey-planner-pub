import {useState, useEffect} from 'react'
// import './App.css';
import GMap from './map/Map.js'
import StationsData from './weather/StationsInfo.js';
import './Map.css'

export default function MapContainer() {
  const [childResponse, setChildResponse] = useState(null)
  const libraries = ['places']
  const childUpdateAPI = (value) => {
    setChildResponse(value)
  }

  useEffect(()=>{
    console.log(`MapContainer`)
    console.log(childResponse)
  }, [childResponse])

  return (
    <div>
      <GMap
      stationsData={childResponse}
      libraries={libraries}
      id='Map'
      />
      <StationsData childUpdateAPI={childUpdateAPI}/>
    </div>
  );
}
