import React from 'react';
import { Grid, Typography, Checkbox, FormControlLabel, Paper } from '@mui/material';

const Weekdays = (props) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const numericValue = parseInt(name);

    props.setSelectedDays((prevSelectedDays) => {
      const updatedSelectedDays = { ...prevSelectedDays };
      updatedSelectedDays[numericValue] = checked;
      return updatedSelectedDays;
    });
  };
  
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Weekdays</Typography>
        {Object.values(props.selectedDays).every((day) => !day) && (
        <p style={{ color: 'red', alignItems: 'center' }}>*Please select at least one day.</p>
        )}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="1"
                  checked={props.selectedDays[1]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Monday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="2"
                  checked={props.selectedDays[2]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Tuesday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="3"
                  checked={props.selectedDays[3]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Wednesday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="4"
                  checked={props.selectedDays[4]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Thursday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="5"
                  checked={props.selectedDays[5]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Friday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="6"
                  checked={props.selectedDays[6]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Saturday"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="7"
                  checked={props.selectedDays[7]}
                  onChange={handleCheckboxChange}
                />
              }
              label="Sunday"
            />
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Weekdays;
