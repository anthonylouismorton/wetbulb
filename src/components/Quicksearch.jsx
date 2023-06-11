import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid
} from '@mui/material';
import axios from 'axios'
import Quickresults from './Quickresults'
import AddressAutoComplete from './reusableComponents/AddressAutoComplete';

export default function QuickSearch() { 
  const [location, setlocation] = useState(null);

  const defaultInformation = {
    weatherInfo: {
      barometer: "",
      humidity: "",
      temperature: "",
      windspeed:""
    },
    wgbtInfo: {
      solarRadiance: '',
      directWBGT: '',
      heatIndex: '',
      shadedWBGT: ''
    },
    dateTimeInfo: {
      time: ''
    }
  }
  const [coords, setcoords] = useState({});
  const [information, setInformation] = useState(defaultInformation);
  const server = process.env.REACT_APP_DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault()
    let refinedAddress = location.description.replace(' ', '+')
    let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`)
    let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2)
    let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2)

    try{
      let wgbtData = await axios.get(`${server}/quickSearch?lat=${trimmedLat}&lon=${trimmedLon}`)
      setcoords({
        lat: trimmedLat,
        lon: trimmedLon
      })
      setInformation(wgbtData.data)
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <Grid 
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
      }}
    >
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              flexDirection: 'column',
              rowGap: '10px'
            }}
            >
            <Typography> Find WBGT For Your Location</Typography>
            <AddressAutoComplete setlocation={setlocation}/>
            <Button type="submit" variant='contained'>Submit</Button>
          </Grid>
        </form>
          <Quickresults information={information}/>
        </Grid>
      </Grid>
  )
}