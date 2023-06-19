import React, { useState, useEffect } from 'react';
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
    { field: 'flagCondition', headerName: 'Flag', width: 130 },
    { field: 'directWBGT', headerName: 'Direct WBGT (\u00B0F)', width: 130 },
    { field: 'shadedWBGT', headerName: 'Shaded WBGT (\u00B0F)', width: 150 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 }
  ];

  const getAllAlerts = async () => {
    try {
      const dbAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/userwbgts/${props.user?.name}`, { headers: { "ngrok-skip-browser-warning": "69420" } });
      const getWbgts = dbAlerts.data;
      const wbgtList = getWbgts.map((wbgt) => {
        let flag = '';
        if (wbgt.directWBGT < 82) {
          flag = 'none';
        } else if (wbgt.directWBGT < 85) {
          flag = 'Green';
        } else if (wbgt.directWBGT < 88) {
          flag = 'Yellow';
        } else if (wbgt.directWBGT < 90) {
          flag = 'Red';
        } else if (wbgt.directWBGT > 90) {
          flag = 'Black';
        }
        return {
          ...wbgt,
          location: wbgt.alert.location,
          flagCondition: flag,
          id: wbgt.wbgtId
        };
      });
      setwbgts(wbgtList);
    } catch (error) {
      console.error('Error fetching alert history:', error);
    }
  };

  useEffect(() => {
    getAllAlerts();
  }, [props.user]);
  console.log(props)
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
          width: '815px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DataGrid
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