import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import axios from 'axios'
import AddressAutoComplete from '../../reusableComponents/AddressAutoComplete';
import Weekdays from './Weekdays';
import { useAuth0 } from '@auth0/auth0-react';
import Flags from './Flags';
import Hours from './Hours';
import Emails from './Emails';

export default function AlertForm(props) {
  const { user } = useAuth0();
  const [selectedFlag, setSelectedFlag] = useState('all');
  const [location, setlocation] = useState('');
  const [selectedDays, setSelectedDays] = useState('1');
  const [selectedHours, setSelectedHours] = useState('a');
  const [emails, setEmails] = useState([]);
  const [address, setAddress] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [editEmails, setEditEmails] = useState([]);

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (let i = 0; i < emails.length; i++) {
      if (!emailRegex.test(emails[i])) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmails();
    if (isEmailValid && selectedHours.length > 0 && selectedDays.length > 0) {
      setSubmitError(false);
      if(props.editAlert){
        let updatedAlert = {
          flag: selectedFlag,
          days: selectedDays,
          hours: selectedHours,
          oldEmails: editEmails,
          newEmails: emails
        };
        await axios.put(`${process.env.REACT_APP_DATABASE}/alert/${props.editAlert.alert.alertId}`, updatedAlert, {headers: {"ngrok-skip-browser-warning": "69420"}});
      }
      else{
        console.log(location.description)
        let refinedAddress = location.description.replace(' ', '+');
        let latLonSearch = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${refinedAddress}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        console.log(latLonSearch.data.results[0].geometry.location)
        let trimmedLat = parseFloat(latLonSearch.data.results[0].geometry.location.lat).toFixed(2);
        let trimmedLon = parseFloat(latLonSearch.data.results[0].geometry.location.lng).toFixed(2);
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
        if(emails.length > 0 ){
          await Promise.all(emails.map(email => axios.post(`${process.env.REACT_APP_DATABASE}/alertEmail/${alertId}`, {alertId: alertId, alertEmail: email}, {headers: {"ngrok-skip-browser-warning": "69420"}})));
        }
      }
      props.setAlertForm(false);
    } 
    else {
      setSubmitError(true);
    }
  };
  const handleCancel = () => {
    props.setAlertForm(false)
    setSelectedFlag('all');
    setlocation('');
    setSelectedDays('1');
    setSelectedHours('a');
    setEmails([]);
    setSubmitError(false);
    props.setEditAlert(null);
  };
  useEffect(() => {
    if (props.editAlert) {
      let emailList = props.editAlert.emails.map(email => email.alertEmail)
      setSelectedFlag(props.editAlert.alert.flag);
      setSelectedDays(props.editAlert.alert.days);
      setSelectedHours(props.editAlert.alert.hours);
      setEditEmails(props.editAlert.emails);
      setEmails(emailList);
    };
  }, [props.editAlert]);
  console.log(props.editAlert)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '25px',
      }}
    >
      <Paper>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              rowGap: '20px'
            }}
          >
            <Grid
              item
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
                  <Typography>Edit Alert</Typography>
                  <Typography>{props.editAlert.alert.location}</Typography>
                </Box>
              )}
            </Grid>
              <Flags
                selectedFlag={selectedFlag}
                setSelectedFlag={setSelectedFlag}
              />
              <Weekdays
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
              <Hours
                selectedHours={selectedHours}
                setSelectedHours={setSelectedHours}
              />
              <Emails emails={emails} setEmails={setEmails} editAlert={props.editAlert}/>
              {submitError && <p style={{ color: 'red' }}>*Fix errors before submitting</p>}
            </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              columnGap: '10px',
              paddingBottom: '20px'
            }}
          >
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
  
}