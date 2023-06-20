import React from 'react';
import {
  TextField,
  Grid,
  Typography,
} from '@mui/material';

export default function Quickresults(props) {
  console.log(props.information)
  return (
    <Grid
    item
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '35px',
      marginBottom: '35px',
      flexDirection: 'column',
      rowGap: '10px'
    }}
    > 
      <Typography></Typography>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          marginBottom: '20px'
        }}
      >
          <TextField
            value={`${props.information.wbgtInfo.directWBGT}`}
            label={'Direct WBGT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wbgtInfo.shadedWBGT}`}
            label={'Shaded WBGT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wbgtInfo.heatIndex}`}
            label={'Heat Index (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wbgtInfo.solarRadiance}`}
            label={'Estimated Solar Irradiance (W/m\u00B2)'}
          />
          <TextField
            value={`${props.information.wbgtInfo.fits}`}
            label={'Fits (\u00B0F)'}
          />
        </Grid>
        <Typography>Weather Information</Typography>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
            columnGap: '10px'
          }}
          >
          <TextField
            value={`${props.information.weatherInfo.barometer}`}
            label={'Barometer (inHg)'}
          />
          <TextField
            value={`${props.information.weatherInfo.humidity}`}
            label={'Humidity (%)'}
          />
          <TextField
            value={`${props.information.weatherInfo.temperature}`}
            label={'Dry Temp (\u00B0F)'}
          />
          <TextField
            value={`${props.information.weatherInfo.wetbulb}`}
            label={'Wetbulb (\u00B0F)'}
          />
          <TextField
            value={`${props.information.weatherInfo.windspeed}`}
            label={'Wind Speed (MPH)'}
          />
          <TextField
            value={`${props.information.dateTimeInfo.time}`}
            label={'Weather Time Stamp'}
          />
        </Grid>
    </Grid>
  )
}