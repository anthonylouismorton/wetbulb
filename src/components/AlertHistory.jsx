import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { ProgramContext } from '../context/program';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Typography,
  Grid
} 
from '@mui/material';

export default function AlertHistory(props) {
  const user = useContext(ProgramContext);
  const [wbgts, setwbgts] = useState([]);
  const { isAuthenticated } = useAuth0();
  const columns = [
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'flagCondition', headerName: 'Flag', width: 130 },
    { field: 'directWBGT', headerName: 'Direct WBGT (\u00B0F)', width: 130 },
    { field: 'shadedWBGT', headerName: 'Shaded WBGT (\u00B0F)', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 }
  ];

  const getAllAlerts = async () => {
    console.log('getting the alerts every minute')
    console.log(props.user)
    let wbgtList = []
    let getWbgts = []
    if(props.user !== undefined){
      console.log('in the if')
      const dbAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/userwbgts/${props.user.name}`, {headers: {"ngrok-skip-browser-warning": "69420"}});
      console.log(dbAlerts)
      getWbgts = dbAlerts.data
    if(getWbgts.length > 1){
      wbgtList = getWbgts.map((wbgt) => {
        console.log(wbgt)
        let flag = ''
        if(wbgt.directWBGT < 82){
          flag = 'none'
        }
        else if(wbgt.directWBGT < 85){
          flag = 'Green'
        }
        else if(wbgt.directWBGT < 88){
          flag = 'Yellow'
        }
        else if(wbgt.directWBGT < 90){
          flag = 'Red'
        }
        else if(wbgt.directWBGT > 90){
          flag = 'Black'
        }
        return {
          ...wbgt,
          location: wbgt.alert.location,
          flagCondition: flag,
          id: wbgt.wbgtId,
          // id: wbgt.wbgtId,
          // location: wbgt.alert.location,
          // flagCondition: flag,
          // directWBGT: wbgt.directWBGT,
          // shadedWBGT: wbgt.shadedWBGT,
          // date: wbgt.date,
          // time: wbgt.time,
          // wbgtId: wbgt.wbgtId,
          // alertId: wbgt.alertId
        }
      })
    }
    console.log(wbgtList)
    setwbgts(wbgtList)
    }
  }
  useEffect(() => {
  getAllAlerts();
  setInterval(getAllAlerts, 1000 * 60 * 60)
  }, [props.user]);
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        marginBottom: '20px',
        flexDirection: 'column'
      }}
    >
    <Typography>Alert History</Typography>
    <Grid 
      sx={{ 
      height: 400, 
      width: '700px',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
    <DataGrid
      rows={wbgts}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
    </Grid>
  </Grid>
  );
}