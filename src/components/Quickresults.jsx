import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography
} from '@mui/material';

export default function Quickresults(props) {
  
  return (
    <Grid
    item
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px',
      flexDirection: 'column',
      rowGap: '10px'
    }}
    > 
      <Typography>WGBT</Typography>
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '10px',
          marginBottom: '20px'
        }}
      >
          <TextField
            value={`${props.information.wgbtInfo.directWBGT}`}
            label={'Direct WGBT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.shadedWBGT}`}
            label={'Shaded WGBT (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.heatIndex}`}
            label={'Heat Index (\u00B0F)'}
          />
          <TextField
            value={`${props.information.wgbtInfo.solarRadiance}`}
            label={'Estimated Solar Radiance (W/m)'}
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
            label={'Barometer (in/Hg)'}
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