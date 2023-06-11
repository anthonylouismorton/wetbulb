import React, { useState, useEffect, useContext } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Typography,
  Grid,
  Paper
} from '@mui/material';

import axios from 'axios'
import { ProgramContext } from '../context/program';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useAuth0 } from '@auth0/auth0-react';

export default function AlertList(props) {
  const [alerts, setAlerts] = useState([]);
  const userProfile = useContext(ProgramContext);
  const { isAuthenticated, user } = useAuth0();
  const getAlerts = async () => {
    if(props.user){
      const userAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/alerts/${props.user.email}`);
      setAlerts(userAlerts.data)
    }
  }
  useEffect(() => {
    getAlerts();
  },[props.user])
  return (
    <Grid item
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography>Alerts</Typography>
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, width: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Flag</TableCell>
                <TableCell align="center">Frequency</TableCell>
                <TableCell align="center">
                  <Tooltip title="Add Alert">
                    <IconButton onClick={()=> props.setnewalert(!props.newalert)}>
                      <NotificationAddIcon/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.length > 0 ? alerts.map((row) => (
                <TableRow
                  key={row.alert.alertId}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.alert.location}</TableCell>
                  <TableCell align="center">{row.alert.flagCondition}</TableCell>
                  <TableCell align="center">{row.alert.frequency}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Remove Alert">
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Alert">
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )):
              <TableRow
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              align="center"
              >
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">You have no alerts setup</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}