import React, { useState } from 'react';
import NewAlertForm from "./NewAlertForm";
import AlertHistory from "./AlertHistory";
import AlertList from './AlertList';
import { Grid } from '@mui/material';

export default function Dashboard(props) {
  const [newalert, setnewalert] = useState(false);
  return (
    <>
    {newalert &&
    <NewAlertForm setnewalert={setnewalert}/>
    }
    {newalert === false &&
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
      }}
    >
    <AlertList user={props.user} newalert={newalert} setnewalert={setnewalert}/>
    <AlertHistory user={props.user}/>
    </Grid>
    }
    </>
  )
}