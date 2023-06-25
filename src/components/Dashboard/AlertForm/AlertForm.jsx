import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios'
import AddressAutoComplete from '../../reusableComponents/AddressAutoComplete';
import Weekdays from './Weekdays';
import { useAuth0 } from '@auth0/auth0-react';
import Flags from './Flags';
import Hours from './Hours';

export default function AlertForm(props) {
  const { user } = useAuth0();
  const [selectedFlag, setSelectedFlag] = useState('all');
  const [location, setlocation] = useState('');
  const [selectedDays, setSelectedDays] = useState('1');
  const [selectedHours, setSelectedHours] = useState('a');
  const [alert, setalert] = useState({
    address: '',
    emails: [],
    flag: '',
    frequency: '',
    alertId: ''
  });

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
        flag: selectedFlag,
        days: selectedDays,
        hours: selectedHours,
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
      flag: selectedFlag,
    });
    props.setEditAlert(null);
  };
  useEffect(() => {
    if (props.editAlert) {
      setalert({
        address: props.editAlert.alert.location,
        emails: [],
        flag: props.editAlert.alert.flag,
        alertId: props.editAlert.alert.alertId
      });
      setSelectedFlag(props.editAlert.alert.flag);
    } else {
      setalert({
        address: '',
        emails: [''],
        flag: selectedFlag,
      });
    };
  }, [props.editAlert]);
  console.log(selectedDays)
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
          <Flags selectedFlag={selectedFlag} setSelectedFlag={setSelectedFlag}/>
          <Weekdays selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>
          <Hours selectedHours={selectedHours} setSelectedHours={setSelectedHours}/>
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