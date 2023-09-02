import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { 
  Typography,
  Grid
} 
from '@mui/material';

export default function AlertHistory(props) {
  const [wbgts, setwbgts] = useState([]);
  const columns = [
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'directWBGT', headerName: 'Direct WBGT (\u00B0F)', width: 130 },
    { field: 'flag', headerName: 'Flag', width: 130 },
    // { field: 'shadedWBGT', headerName: 'Shaded WBGT (\u00B0F)', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 }
  ];

  const getAllAlerts = async () => {
    try {
      const dbAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/userwbgts/${props.user?.name}`, { headers: { "ngrok-skip-browser-warning": "69420" } });
      const getWbgts = dbAlerts.data;
      const wbgtList = getWbgts.map((wbgt) => {
        return {
          ...wbgt,
          location: wbgt.alert.location,
          id: wbgt.wbgtId
        };
      });
      setwbgts(wbgtList);
    } catch (e) {
      return e
    }
  };

  useEffect(() => {
    getAllAlerts();
    const socket = io(`${process.env.REACT_APP_DATABASE}`, {
      extraHeaders: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    socket.on('message', (message) => {
      // console.log(message)
    });
    if(props.user){
      socket.on(`${props.user.name}Wbgt`, (wbgt) => {
        setwbgts(prevWbgts => [...prevWbgts,
          {id: wbgt.createdWbgt.wbgtId,
            ...wbgt.createdWbgt, 
            location: wbgt.alert.location,
            lat: wbgt.alert.lat,
            lon: wbgt.alert.lon,
            alert: wbgt.alert
          }])
      })
    }

    return () => {
      socket.disconnect();
    };
  }, [props.user]);
  
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h4'>Alert History</Typography>
      <Grid
        sx={{
          marginTop: '25px',
          height: 400,
          width: '680px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DataGrid
          sx={{
            '.MuiDataGrid-cell:focus': {
              outline: 'none'
            },
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer'
            }
          }}
          rows={wbgts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(params) => props.handleAlertClick(params.row)}
        />
      </Grid>
    </Grid>
  );
}