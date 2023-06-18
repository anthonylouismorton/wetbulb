import React, { useState } from 'react';
import AlertForm from "./AlertForm";
import AlertHistory from "./AlertHistory";
import AlertList from './AlertList';
import { Grid } from '@mui/material';

export default function Dashboard(props) {
  const [newalert, setAlertForm] = useState(false);
  const [editAlert, setEditAlert] = useState(null);

  const handleEditAlert = (alert) => {
    setEditAlert(alert);
    setAlertForm(true);
  };

  return (
    <>
      {newalert && (
        <AlertForm
          setAlertForm={setAlertForm}
          editAlert={editAlert}
          setEditAlert={setEditAlert}
        />
      )}
      {!newalert && (
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <AlertList
            user={props.user}
            newalert={newalert}
            setAlertForm={setAlertForm}
            editAlert={handleEditAlert}
          />
          <AlertHistory user={props.user} />
        </Grid>
      )}
    </>
  );
}
