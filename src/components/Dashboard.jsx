import React, { useState } from 'react';
import AlertForm from "./AlertForm";
import AlertHistory from "./AlertHistory";
import AlertList from './AlertList';
import { Grid } from '@mui/material';

export default function Dashboard(props) {
  const [newalert, setnewalert] = useState(false);
  const [editAlert, setEditAlert] = useState(null);

  const handleEditAlert = (alert) => {
    setEditAlert(alert);
    setnewalert(true);
  };

  return (
    <>
      {newalert && (
        <AlertForm
          setnewalert={setnewalert}
          editAlert={editAlert}
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
            setnewalert={setnewalert}
            onEditAlert={handleEditAlert} // Pass onEditAlert handler
          />
          <AlertHistory user={props.user} />
        </Grid>
      )}
    </>
  );
}
