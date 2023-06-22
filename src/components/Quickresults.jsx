import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const textfieldStyles = {
  width: '225px' // Adjust the value to your desired minimum width
};
const textGridStyles = {
  xl: 2,
  lg: 3,
  md: 4,
  sm: 6,
  xs: 12,
  display: 'flex',
  justifyContent: 'center'
}

export default function Quickresults(props) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={3}
      sx={{ marginTop: '50px' }}
    >
      <Typography variant="h6">Weather Information</Typography>
      <Grid container item spacing={3} display = 'flex' justifyContent = 'center'>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.wbgtInfo.directWBGT}`}
            label="Direct WBGT (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.wbgtInfo.shadedWBGT}`}
            label="Shaded WBGT (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.wbgtInfo.heatIndex}`}
            label="Heat Index (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.wbgtInfo.solarRadiance}`}
            label="Est Solar Irradiance (W/m²)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.wbgtInfo.fits}`}
            label="Fits (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.weatherInfo.barometer}`}
            label="Barometer (inHg)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.weatherInfo.humidity}`}
            label="Humidity (%)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.weatherInfo.temperature}`}
            label="Dry Temp (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.weatherInfo.wetbulb}`}
            label="Wetbulb (°F)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.weatherInfo.windspeed}`}
            label="Wind Speed (MPH)"
          />
        </Grid>
        <Grid item sx={textGridStyles}>
          <TextField
            sx={textfieldStyles}
            value={`${props.information.dateTimeInfo.time}`}
            label="Weather Time Stamp"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
