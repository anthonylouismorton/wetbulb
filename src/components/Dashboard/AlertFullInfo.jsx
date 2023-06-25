import React from 'react';
import { Typography, Box } from '@mui/material';

export default function AlertFullInfo({ alert }) {
  if (!alert) {
    return null;
  }

  const headingSyles = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const columnStyles = {
    padding: '10px',
    textAlign: 'center',
  };
 
  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    minWidth: '700px',
    height: '40%',
    minHeight: '300px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    padding: '20px',
    overflow: 'auto',
  };

  return (
    <Box sx={style}>
      <Box sx={columnStyles}>
        <Typography sx={headingSyles}>Location</Typography>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Typography>{alert.location} ({alert.alert.lat}, {alert.alert.lon})</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Box sx={columnStyles}>
          <Typography sx={headingSyles}>WBGT</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
            <Box>
            <Typography>Direct WBGT: {alert.directWBGT}°F</Typography>
            <Typography>Flag: {alert.flag}</Typography>
            <Typography>Shaded WBGT: {alert.shadedWBGT}°F</Typography>
            <Typography>Fits: {alert.fits}°F</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{textAlign: 'center', padding: '10px', width: '400px'}}>
          <Typography sx={headingSyles}>Weather</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <Typography>Date: {alert.date}</Typography>
            <Typography>Barometer: {alert.barometer} inHg</Typography>
            <Typography>Humidity: {alert.humidity}%</Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <Typography>Time: {alert.time}</Typography>
              <Typography>Wet Bulb: {alert.wetbulb}°F</Typography>
              <Typography>Heat Index: {alert.heatIndex}°F</Typography>
              <Typography component="span">Solar Irradiance: {alert.solarRadiance} W/m<sup>2</sup></Typography>
            </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
