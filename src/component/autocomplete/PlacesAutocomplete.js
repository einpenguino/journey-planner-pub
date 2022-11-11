/* global google */
import usePlacesAutocomplete,{ getGeocode, getLatLng} from 'use-places-autocomplete'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CircularProgress from '@mui/material/CircularProgress';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react'
import './Autocomplete.css'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Link} from 'react-router-dom'

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

export default function PlacesAutocomplete ({ setSelected , selectTravelMode, distance, duration}) {
  const [originField, setOriginField] = React.useState(null)
  const [destinationField, setDestinationField] = React.useState(null)
  // const defaultTravelOptions = {
  //   driving:google.maps.TravelMode.DRIVING,
  //   bicycling:google.maps.TravelMode.BICYCLING,
  //   transit:google.maps.TravelMode.TRANSIT,
  //   walking:google.maps.TravelMode.WALKING
  // }
  const [alignment, setAlignment] = React.useState('driving')
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

  function handleAlignment (e, alignment) {
    console.log(alignment)
    setAlignment(alignment)
    selectTravelMode(alignment)
  }

  React.useEffect(() => {
    console.log(alignment)
  }, [alignment])

  React.useEffect(() => {
    if (originField !== null) setOriginValue(originField)
    if (destinationField !== null) setDestinationValue(destinationField)
  }, [originField, destinationField])

  return (
    <Grid2 container spacing={2} margin='0 5%' height='8vh'>
      <Grid2 xs={3}>
      </Grid2>
      <Grid2 xs={2} display='flex' justifyContent='right'>
        <ComboBox 
        setValue={setOriginField}
        parentValue={originField}
        label='Origin' 
        disabled={!originReady} 
        className='nav-controls'
        status={originStatus}
        data={originData}
        />
      </Grid2>
      <Grid2 xs={2} display='flex' justifyContent='left'>
        <ComboBox 
        setValue={setDestinationField} 
        parentValue={destinationField}
        label='Destination'
        disabled={!destinationReady} 
        className='nav-controls'
        status={destinationStatus}
        data={destinationData}
        />
      </Grid2>
      <Grid2 sx={2}>
      <Grid2 container>
          <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          color='primary'
          fullWidth={true}
          >
              <ToggleButton 
              value='driving'
              aria-label='travel mode-driving'
              >
                <DirectionsCarIcon/>
              </ToggleButton>
              <ToggleButton 
              value='transit'
              aria-label='travel mode-transit'
              >
                <DirectionsSubwayIcon/>
              </ToggleButton>
              <ToggleButton 
              value='bicycling'
              aria-label='travel mode-bicycling'
              >
                <DirectionsBikeIcon/>
              </ToggleButton>
              <ToggleButton 
              value='walking'
              aria-label='travel mode-walking'
              >
                <DirectionsRunIcon/>
              </ToggleButton>
          </ToggleButtonGroup>
        </Grid2>

      </Grid2>
      <Grid2 cs={0.5} display='flex' justifyContent='left'>
        <IconButton 
        aria-label='Route!'
        onClick={handleSubmit}
        color='primary'
        >
          <DirectionsIcon/>
        </IconButton>
      </Grid2>
      <Grid2 xs={0.5} display='flex' justifyContent='left'>
        <IconButton 
        aria-label='Cancel'
        onClick={clearSuggestions}
        color='error'
        >
          <CancelIcon/>
        </IconButton>
      </Grid2>
      <Grid2 xs={1.5}>
        <Box>
          <Typography vatiant='overline'>
            {distance}
          </Typography>
          <Typography vatiant='button'>
            {duration}
          </Typography>
        </Box>

      </Grid2>
      <Grid2 xs={0.5} display='flex' justifyContent='right'>
        <Link to='/datatable'>
          <IconButton
          aria-label='To data table!'
          color='secondary'
          >
            <TableRowsIcon />
          </IconButton>
        </Link>
        <Link to='/about'>
          <IconButton
          aria-label='To-About-Page'
          color='secondary'
          >
            <SentimentVerySatisfiedIcon/>
          </IconButton>
        </Link>
      </Grid2>
      {/* <img src={rainCloudIcon}></img> */}
    </Grid2>
      
    // </div>
  )
  
}