import React, { useState } from 'react';
import { Grid, Typography, Checkbox } from '@mui/material';

const Weekdays = (props) => {

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const numericValue = parseInt(name);

    if (checked) {
      // Add the numeric value to the array and sort it
      props.setSelectedDays((prevSelectedDays) =>
        [...prevSelectedDays, numericValue].sort().join('')
      );
    } else {
      // Remove the numeric value from the array
      props.setSelectedDays((prevSelectedDays) => {
        const daysArray = Array.isArray(prevSelectedDays)
          ? prevSelectedDays
          : Array.from(prevSelectedDays.toString()).map(Number);
        return daysArray.filter((day) => day !== numericValue).join('');
      });
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Weekdays</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <Checkbox
              name="1"
              checked={props.selectedDays.includes('1')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Monday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="2"
              checked={props.selectedDays.includes('2')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Tuesday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="3"
              checked={props.selectedDays.includes('3')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Wednesday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="4"
              checked={props.selectedDays.includes('4')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Thursday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="5"
              checked={props.selectedDays.includes('5')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Friday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="6"
              checked={props.selectedDays.includes('6')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Saturday</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              name="7"
              checked={props.selectedDays.includes('7')}
              onChange={handleCheckboxChange}
            />
          </Grid>
          <Grid item>
            <Typography>Sunday</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Weekdays;
