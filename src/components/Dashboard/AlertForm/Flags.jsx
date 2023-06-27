import React, { useState } from 'react';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

export default function Flags(props) {
  const handleChange = (e) => {
    props.setSelectedFlag(e.target.value)
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Choose Flag Condition for Alerts</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <RadioGroup
          aria-label="Flag"
          name="flag"
          value={props.selectedFlag}
          onChange={handleChange}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All Temps" />
          <FormControlLabel value="green" control={<Radio />} label="Green (<82 degrees F)" />
          <FormControlLabel value="yellow" control={<Radio />} label="Yellow (<85 degrees F)" />
          <FormControlLabel value="red" control={<Radio />} label="Red (<88 degrees F)" />
          <FormControlLabel value="black" control={<Radio />} label="Black (<90 degrees F)" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
  
}