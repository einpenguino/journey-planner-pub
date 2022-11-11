import usePlacesAutocomplete,{ getGeocode, getLatLng} from 'use-places-autocomplete'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import CancelIcon from '@mui/icons-material/Cancel';
// import {GoogleMap, Marker, useJsApiLoader, Autocomplete} from '@react-google-maps/api'
// import { Autocomplete } from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react'
import './Autocomplete.css'
import rainCloudIcon from '../icons/svg/wi-cloud.svg'

function ComboBox({setValue, parentValue, label, status, data}) {
  const [fieldValue, setFieldValue] = React.useState(parentValue)
  // const handleInputChange = (value) => {
  //   setValue(value)
  // }
  React.useEffect(() => {
    if (parentValue === null) setFieldValue(parentValue)
  }, [parentValue])
  return (
    <Autocomplete
      disablePortal
      // Input autocomplete options here
      options={status==='OK' ? data.map((entry) => entry.description) : []}
      sx={{ width: 300 }}
      onInputChange={(event, value) => {
        setValue(value)
        setFieldValue(value)
        }
      }
      value={fieldValue}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );

}

export default function PlacesAutocomplete ({ setSelected }) {
  const [originField, setOriginField] = React.useState(null)
  const [destinationField, setDestinationField] = React.useState(null)

  const {
    ready : originReady,
    value : originValue,
    setValue : setOriginValue,
    suggestions: {status : originStatus, data : originData},
    clearSuggestions : originClearSuggestions
  } = usePlacesAutocomplete({
    cache: 24 * 60 * 60,
    cacheKey:'region-restricted'
  });

  const {
    ready : destinationReady,
    value : destinationValue,
    setValue : setDestinationValue,
    suggestions: {status : destinationStatus, data : destinationData},
    clearSuggestions : destinationClearSuggestions
  } = usePlacesAutocomplete();
  
  async function handleSubmit () {

    const originResults = await getGeocode({address : originValue})
    const originCoo = await getLatLng(originResults[0])

    const destinationResults = await getGeocode({address : destinationValue})
    const destinationCoo = await getLatLng(destinationResults[0])
    
    setSelected([originCoo, destinationCoo])
  }

  function clearSuggestions() {
    setSelected(null)
    setOriginField(null)
    setDestinationField(null)
  }

  React.useEffect(() => {
    if (originField !== null) setOriginValue(originField)
    if (destinationField !== null) setDestinationValue(destinationField)
  }, [originField, destinationField])

  return (
    <div className='navContainer'>
      <ComboBox 
      setValue={setOriginField}
      parentValue={originField}
      label='Origin' 
      disabled={!originReady} 
      className='nav-controls'
      status={originStatus}
      data={originData}
      />
      <ComboBox 
      setValue={setDestinationField} 
      parentValue={destinationField}
      label='Destination'
      disabled={!destinationReady} 
      className='nav-controls'
      status={destinationStatus}
      data={destinationData}
      />
      {/* <button type='Submit' id='submit-btn' className='nav-controls' onClick={handleSubmit}>Route!</button> */}
      <IconButton 
      aria-label='Route!'
      onClick={handleSubmit}>
        <DirectionsIcon/>
      </IconButton>
      <IconButton 
      aria-label='Cancel'
      onClick={clearSuggestions}>
        <CancelIcon/>
      </IconButton>
      {/* <img src={rainCloudIcon}></img> */}
    </div>
  )
  
}