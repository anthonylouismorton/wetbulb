import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios'
import AddressAutoComplete from './reusableComponents/AddressAutoComplete';
import { useAuth0 } from '@auth0/auth0-react';

export default function AlertForm(props) {
  const { user } = useAuth0();
  const [radio, setRadio] = useState('all');
  const [location, setlocation] = useState('');
  const [frequency, setfrequency] = useState('hourly');
  const [alert, setalert] = useState({
    address: '',
    emails: [],
    flag: '',
    frequency: '',
    alertId: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    if(name === 'flag'){
      setRadio(e.target.value)
      setalert({
        ...alert,
        [name]: value
      })
    }
    else if(name === 'frequency'){
      setfrequency(e.target.value)
      setalert({
        ...alert,
        [name]: value
      })
    }
    else{
      setalert({
        ...alert,
        [name]: value
      })
    }
  };

  const handleRemoveEmail = (index, flow) => {
    let emailArray = alert.emails;
    emailArray.splice(index, 1)
    setalert({
      ...alert,
      emails: emailArray
    });
  };

  const handleNewEmail = () => {
    let emailArray = alert.emails
    emailArray.push('')
    setalert({
      ...alert,
      emails: emailArray
    });
  };

  const handleEmail = (index, e) => {
    let emailArray = alert.emails
    const {name, value} = e.target
    emailArray[index] = value
    setalert({
      ...alert,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(props.editAlert){
      await axios.put(`${process.env.REACT_APP_DATABASE}/alert/${props.editAlert.alert.alertId}`, alert, {headers: {"ngrok-skip-browser-warning": "69420"}})
    }
    else{
      let refinedAddress = location.description.replace(' ', '+');
      let latLonSearch = await axios.get(`https://geocode.maps.co/search?q=${refinedAddress}`);
      let trimmedLat = parseFloat(latLonSearch.data[0].lat).toFixed(2);
      let trimmedLon = parseFloat(latLonSearch.data[0].lon).toFixed(2);
      let newAlert = {
        lat: trimmedLat,
        lon: trimmedLon,
        location: location.description,
        flagCondition: alert.flag,
        frequency: alert.frequency,
        alertEmail: user.email
      };
      let createdAlert = await axios.post(`${process.env.REACT_APP_DATABASE}/alert/`, newAlert);
      let alertId = parseInt(createdAlert.data.alertId);
      await Promise.all(alert.emails.map(email => axios.post(`${process.env.REACT_APP_DATABASE}/alertEmail/${alertId}`, {alertId: alertId, alertEmail: email}, {headers: {"ngrok-skip-browser-warning": "69420"}})));
    }
    props.setAlertForm(false);
  };
  const handleCancel = () => {
    props.setAlertForm(false)
    setalert({
      address: '',
      emails: [''],
      flag: radio,
      frequency: frequency
    });
    props.setEditAlert(null);
  };
  useEffect(() => {
    if (props.editAlert) {
      setalert({
        address: props.editAlert.alert.location,
        emails: [],
        flag: props.editAlert.alert.flagCondition,
        frequency: props.editAlert.alert.frequency,
        alertId: props.editAlert.alert.alertId
      });
      setRadio(props.editAlert.alert.flagCondition);
      setfrequency(props.editAlert.alert.frequency)
    } else {
      setalert({
        address: '',
        emails: [''],
        flag: radio,
        frequency: frequency
      });
    };
  }, [props.editAlert]);
  console.log(alert)
  return (
    <Box container="true"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '25px',
      }}
    >
    <Paper>
      <form onSubmit={handleSubmit}>
      <Grid container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          rowGap: '20px'
        }}
      >
        <Grid item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '5px'
          }}
        >
          {!props.editAlert ? (
          <Box>
            <Typography>Create New Alert </Typography>
            <AddressAutoComplete setlocation={setlocation} />
          </Box>
          ) : (
          <Box>
            <Typography>Edit  Alert</Typography>
            <Typography>{props.editAlert.alert.location}</Typography>
          </Box>
          )}

        </Grid>
          <Grid item>
            <Typography>Choose Flag Condition for Alerts</Typography>
              <RadioGroup aria-label="Flag" name="flag" value={radio} onChange={handleChange}>
                <FormControlLabel value="all" control={<Radio />} label="All Temps" />
                <FormControlLabel value="green" control={<Radio />} label="Green Flag and higher (<82 degrees F)" />
                <FormControlLabel value="yellow" control={<Radio />} label="Yellow Flag and higher (<85 degrees F)" />
                <FormControlLabel value="red" control={<Radio />} label="Red Flag and higher (<88 degrees F)" />
                <FormControlLabel value="black" control={<Radio />} label="Black Flag and higher (<90 degrees F)" />
              </RadioGroup>
          </Grid>
          <Grid item>
            <Typography>Choose Alert Frequency</Typography>
            <RadioGroup aria-label="Flag" name="frequency" value={frequency} onChange={handleChange}>
              <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />
              <FormControlLabel value="2hours" control={<Radio />} label="Every 2 hours" />
              <FormControlLabel value="4hours" control={<Radio />} label="Every 4 hours" />
            </RadioGroup>
          </Grid>
          <Grid item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '5px'
            }}
          >
            <Typography>Email Distribution List</Typography>
            {alert.emails.map((flow,index) => 
            <Grid key = {index}>
              <TextField
                name='ventFlow'
                id='outlined-multiline-static'
                label={`Email ${index+1}`}
                value={alert.emails[index]}
                onChange={(e)=> handleEmail(index, e)}
                size='small'
              />
              {index === 0 ?
              <Tooltip title="Add Measurement">
                <IconButton onClick={handleNewEmail}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              :
              <Tooltip title="Remove Measurement">
                <IconButton onClick={()=> handleRemoveEmail(index, flow)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
              }
              </Grid>
            )
          }
          </Grid>
      </Grid>
      <Grid item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          columnGap: '10px',
          paddingBottom: '20px'
        }}
      >
        <Button type="submit" variant='contained'>Submit</Button>
        <Button variant='contained' onClick={handleCancel}>Cancel</Button>
      </Grid>
      </form>
    </Paper>
    </Box>
  )
}