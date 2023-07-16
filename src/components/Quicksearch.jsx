import React, { useState } from 'react';
import {
  Button,
  Typography,
  Grid
} from '@mui/material';
import axios from 'axios'
import Quickresults from './Quickresults'
import AddressAutoComplete from './reusableComponents/AddressAutoComplete';
import CircularProgress from '@mui/material/CircularProgress';
import FlagConditionsTable from './FlagConditionsTable.jsx';

export default function QuickSearch() { 
  const [location, setlocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const defaultInformation = {
    weatherInfo: {
      barometer: "",
      humidity: "",
      temperature: "",
      windspeed: "",
      wetbulb: ""
    },
    wbgtInfo: {
      solarRadiance: '',
      directWBGT: '',
      heatIndex: '',
      shadedWBGT: '',
      fits: ''
    },
    dateTimeInfo: {
      time: ''
    }
  }
  // const [coords, setcoords] = useState({});
  const [information, setInformation] = useState(defaultInformation);
  const server = process.env.REACT_APP_DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    let refinedAddress = location.description.replace(' ', '+')
    let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`)
    let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2)
    let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2)

    try{
      let wbgtData = await axios.get(`${server}/quickSearch?lat=${trimmedLat}&lon=${trimmedLon}`, {headers: {"ngrok-skip-browser-warning": "69420"}})
      // setcoords({
      //   lat: trimmedLat,
      //   lon: trimmedLon
      // })
      console.log(wbgtData.data)
      setInformation(wbgtData.data)
      setShowResults(true);
    }
    catch(e){
      console.log(e)
    }
    setIsLoading(false);
  }
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: '20px',
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
            <Typography variant="h4" sx={{ margin: '50px 0', fontWeight: 'bold' }}>
              WBGT Estimate Calculator
            </Typography>

            <AddressAutoComplete setlocation={setlocation}/>
            <Button type="submit" variant='contained'>Calculate</Button>
          </Grid>
        </form>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          sx={{ marginTop: '10px' }}
        >
          {isLoading && <CircularProgress sx={{ marginTop: '100px', marginBottom: '100px' }} />}
        </Grid>
          {showResults && !isLoading && <Quickresults information={information} />}
        </Grid>
        <FlagConditionsTable/>
      </Grid>
  )
}