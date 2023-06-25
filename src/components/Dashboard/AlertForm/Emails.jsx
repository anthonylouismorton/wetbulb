import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Emails = ({ emails, setEmails, editAlert }) => {
  const [emailErrors, setEmailErrors] = useState([]);

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
    setEmailErrors((prevErrors) => prevErrors.filter((error) => error !== index));
  };

  const handleNewEmail = () => {
    setEmails((prevEmails) => [...prevEmails, '']);
  };

  const handleEmail = (index, e) => {
    const { value } = e.target;
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
    validateEmail(index, value);
  };

  const validateEmail = (index, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setEmailErrors((prevErrors) =>
      isValid
        ? prevErrors.filter((error) => error !== index)
        : [...prevErrors, index]
    );
  };

  useEffect(() => {
    if (editAlert) {
      const emailList = editAlert.emails.map((email) => email.alertEmail);
      setEmails(emailList);
      if (emails.length === 0) {
        handleNewEmail();
      }
    }
  }, [editAlert]);

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px'
      }}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Typography>Email Distribution List</Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Add Email">
            <IconButton onClick={handleNewEmail}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {emails.map((email, index) => (
        <React.Fragment key={index}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <TextField
                name={`email-${index}`}
                label={`Email ${index + 1}`}
                value={email}
                onChange={(e) => handleEmail(index, e)}
                error={emailErrors.includes(index)}
                helperText={emailErrors.includes(index) && 'Invalid email'}
                size="small"
              />
            </Grid>
            <Grid item>
              <Tooltip title="Remove Email">
                <IconButton onClick={() => handleRemoveEmail(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
  
};

export default Emails;
