import React from 'react';
import { Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';

export default function Hours(props) {
  const { selectedHours, setSelectedHours } = props;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const hour = `hour${name}`; // Add the "hour" prefix
    let updatedSelectedHours = [...selectedHours];

    if (checked) {
      updatedSelectedHours.push(hour);
    } else {
      updatedSelectedHours = updatedSelectedHours.filter((h) => h !== hour);
    }

    setSelectedHours(updatedSelectedHours);
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
        {Object.values(props.selectedHours).every((hour) => !hour) && (
            <p style={{ color: 'red', alignItems: 'center' }}>*Please select at least one hour.</p>
        )}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {[...Array(24)].map((_, hour) => (
            <React.Fragment key={hour}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={String(hour)}
                      checked={selectedHours.includes(`hour${hour}`)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={formatTime(hour)}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
