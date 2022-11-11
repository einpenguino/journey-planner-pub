import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({setValue, label, status, data}) {
    const handleInputChange = (value) => {
      // console.log(e.currentTarget.value)
      setValue(value)
    }
    
  
    return (
      <Autocomplete
        disablePortal
        // id="combo-box-demo"
        // Input autocomplete options here
        options={status==='OK' ? data.map((entry) => entry.description) : []}
        sx={{ width: 300 }}
        onInputChange={(event, value) => {
          // console.log(value)
          // handleInputChange(`${value}, Singapore`)
          handleInputChange(value)
          console.log(status)
          console.log(data)
          }
        }
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    );
  
  }