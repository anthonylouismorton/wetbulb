import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button
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
  const [selectedDays, setSelectedDays] = useState({
    "monday": true,
    "tuesday": true,
    "wednesday": true,
    "thursday": true,
    "friday": true,
    "saturday": false,
    "sunday": false,
  });
  
  const [selectedHours, setSelectedHours] = useState(["hour7","hour8","hour9","hour10","hour11","hour12","hour13","hour14","hour15","hour16","hour17"]);
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
    if (isEmailValid && Object.values(selectedDays).includes(true) > 0 && selectedHours.length > 0) {
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
        let refinedAddress = location.description.replace(' ', '+');
        let latLonSearch = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${refinedAddress}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        let trimmedLat = parseFloat(latLonSearch.data.results[0].geometry.location.lat).toFixed(2);
        let trimmedLon = parseFloat(latLonSearch.data.results[0].geometry.location.lng).toFixed(2);
        const timezoneSearch = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${trimmedLat},${trimmedLon}&timestamp=${Math.floor(Date.now() / 1000)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        
        const timeZoneId = timezoneSearch.data.timeZoneId;
        console.log(timeZoneId)
        let newAlert = {
          lat: trimmedLat,
          lon: trimmedLon,
          location: location.description,
          flag: selectedFlag,
          days: selectedDays,
          hours: selectedHours,
          alertEmail: user.email,
          timeZoneId: timeZoneId
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
    setSelectedHours(["hour7","hour8","hour9","hour10","hour11","hour12","hour13","hour14","hour15","hour16","hour17"]);
    setEmails([]);
    setSubmitError(false);
    props.setEditAlert(null);
  };
  useEffect(() => {
    if (props.editAlert) {
      console.log('in the if')
      console.log(props.editAlert.alert.hour)
      let emailList = props.editAlert.emails.map(email => email.alertEmail)
      setSelectedFlag(props.editAlert.alert.flag);
      setSelectedDays({
        "monday": props.editAlert.alert.monday,
        "tuesday": props.editAlert.alert.tuesday,
        "wednesday": props.editAlert.alert.wednesday,
        "thursday": props.editAlert.alert.thursday,
        "friday": props.editAlert.alert.friday,
        "saturday": props.editAlert.alert.saturday,
        "sunday": props.editAlert.alert.sunday,
    });
    const setSelectedHours = (hours) => {
      const selectedHours = Object.keys(props.editAlert.alert.hour)
        .filter((key) => key.startsWith('hour')) // Filter out unwanted keys
        .reduce((result, key) => {
          result[key] = hours[key];
          return result;
        }, {});
    
      // Set the selectedHours state
      setSelectedHours(selectedHours);
    };
    
      setEditEmails(props.editAlert.emails);
      setEmails(emailList);
    };
  }, [props.editAlert]);
  console.log(selectedHours)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
              textAlign: 'center',
            }}
          >
            {!props.editAlert ? (
              <Box>
                <Typography variant='h5'>Create New Alert </Typography>
                <AddressAutoComplete setlocation={setlocation} />
              </Box>
            ) : (
              <Box>
                <Typography variant='h5'>Edit Alert</Typography>
                <Typography variant='h5'>{props.editAlert.alert.location}</Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              rowGap: '5px'
            }}
          >
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
    </Box>
  );
  
}