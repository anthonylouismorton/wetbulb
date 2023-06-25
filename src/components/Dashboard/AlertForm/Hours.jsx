import React, { useState } from 'react';
import { Grid, Typography, Checkbox } from '@mui/material';

export default function Hours(props) {
  const { selectedHours, setSelectedHours } = props;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const hour = convertToLetter(Number(name));
    let updatedSelectedHours = selectedHours;
  
    if (checked) {
      updatedSelectedHours += hour;
    } else {
      updatedSelectedHours = updatedSelectedHours.replace(hour, '');
    }
  
    // Sort the updatedSelectedHours in alphabetical order
    updatedSelectedHours = updatedSelectedHours
      .split('')
      .sort()
      .join('');
  
    setSelectedHours(updatedSelectedHours);
  };
  

  const convertToLetter = (hour) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[hour % 24];
  };

  const formatTime = (hour) => {
    const formattedHour = hour % 12 || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour} ${period}`;
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Hours</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {[...Array(24)].map((_, hour) => (
            <React.Fragment key={hour}>
              <Grid item>
                <Checkbox
                  name={String(hour)}
                  checked={selectedHours.includes(convertToLetter(hour))}
                  onChange={handleCheckboxChange}
                />
              </Grid>
              <Grid item>
                <Typography>{formatTime(hour)}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
