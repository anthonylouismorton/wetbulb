import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const boxStyles = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '10px',
};

const titleStyles = {
  fontSize: '20px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  padding: '10px',
};

const informationStyles = {
  fontSize: '15px',
  textAlign: 'center',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const backgroundImageStyle = {
  // backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function WbgtHome() {
  return (
    <Box sx={backgroundImageStyle}>
      <Box sx={{ margin: '25px' }}>
        <Typography sx={{ textAlign: 'center', margin: '40px 0', wordBreak: 'break-word', fontSize: '45px' }}>
          Welcome to the Wet Bulb Globe Temperature (WBGT) Calculator!
        </Typography>
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Try it out!
          </Typography>
          <Button component={RouterLink} to="/quicksearch" variant="contained">
            Get WBGT
          </Button>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  What is a WBGT?
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  WBGT is a measure of the heat stress in direct sunlight, which takes into account: temperature, humidity, wind speed, sun angle, and cloud cover (solar radiation). This differs from the heat index, which takes into consideration temperature and humidity and is calculated for shady areas. For more background info on WBGT
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  How is the WBGT calculated?
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  WBGT is calculated as the weighted sum of natural wet bulb temperature (Tnwb), globe temperature (Tg), and dry bulb/ambient temperature (Ta): WBGT = 0.7Tnwb + 0.2Tg + 0.1Ta.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  How does the WBGT Calculator Work?
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  This Calculator is used to estimate the WBGT of a user-provided location. It uses weather data collected by OpenWeather. The weather data, in addition to the user-provided location, is then entered into a formula that calculates the current WBGT for the user-provided location.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  Why the WBGT is important
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  The WBGT is used to determine when a heat exposure hazard exists. The higher the WBGT, the more likely it is that a person may suffer a heat-related illness.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  Setup WBGT Alerts!
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  You can schedule an alert for a location of your choice. We will send you an email when your alert location reaches a certain WBGT and provide you with the estimated WBGT. To get alerts, just click the login button, sign in to Auth0 (this is a free authentication service that will protect your password), and you will be navigated to the dashboard page. There you can set a WBGT or check previous alerts you have received.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={boxStyles}>
              <Box>
                <Typography sx={titleStyles}>
                  Accuracy and Limitations
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={informationStyles}>
                  This calculator is based on the Kasten-Czeplak algorithm to estimate the clear sky solar irradiance (Sandia, 2012). Please visit the About page for a detailed explanation of how the calculator works, its limitations, and its accuracy.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
