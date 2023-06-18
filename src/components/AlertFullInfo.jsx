import React from 'react';
import { Typography, Box } from '@mui/material';

export default function AlertFullInfo({ alert }) {
  if (!alert) {
    return null;
  }

  const headingSyles = {
    fontSize: '20px',
    fontWeight: 'bold'
    
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
          <Typography>{alert.location}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Typography>Lat: {alert.alert.lat}</Typography>
          <Typography>Lon: {alert.alert.lon}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Box sx={columnStyles}>
          <Typography sx={headingSyles}>WBGT</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Direct WBGT: {alert.directWBGT}</Typography>
            <Typography>Flag: {alert.flagCondition}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Shaded WBGT: {alert.shadedWBGT}</Typography>
            <Typography>Fits: {alert.fits}</Typography>
          </Box>
        </Box>
        <Box sx={columnStyles}>
          <Typography sx={headingSyles}>Weather</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Date: {alert.date}</Typography>
            <Typography>Time: {alert.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography>Barometer: {alert.barometer}</Typography>
            <Typography>Solar Radiance: {alert.solarRadiance}</Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography>Wet Bulb: {alert.wetBulb}</Typography>
              <Typography>Humidity: {alert.humidity}</Typography>
              <Typography>Heat Index: {alert.heatIndex}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
