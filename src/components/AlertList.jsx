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
  Paper,
  Popover,
  Button,
  Box
} from '@mui/material';

import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

export default function AlertList(props) {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const getAlerts = async () => {
    if (props.user) {
      const userAlerts = await axios.get(`${process.env.REACT_APP_DATABASE}/alerts/${props.user.email}`, { headers: { "ngrok-skip-browser-warning": "69420" } });
      setAlerts(userAlerts.data);
    }
  };
  const deleteHandler = (event, alertId) => {
    setSelectedAlert(alertId);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleDelete = async () => {
    await axios.delete(`${process.env.REACT_APP_DATABASE}/alert/${selectedAlert}`, { headers: { "ngrok-skip-browser-warning": "69420" } }, selectedAlert);
    setSelectedAlert(null);
    await getAlerts();
    handleClose();
  };

  const handleEditAlert = (alert) => {
      props.editAlert(alert);
  };

  useEffect(() => {
    getAlerts();
  }, [props.user]);

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
                    <IconButton onClick={() => props.setAlertForm(!props.alertForm)}>
                      <NotificationAddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.length > 0 ? alerts.map((row) => (
                <TableRow
                  key={row.alert.alertId}
                >
                  <TableCell align="center">{row.alert.location}</TableCell>
                  <TableCell align="center">{row.alert.flagCondition}</TableCell>
                  <TableCell align="center">{row.alert.frequency}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Remove Alert">
                      <IconButton onClick={(event) => deleteHandler(event, row.alert.alertId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Popover
                      open={selectedAlert === row.alert.alertId && open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                          Are you sure you want to remove this alert?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Button onClick={handleDelete} variant="contained" color="error" sx={{ marginRight: 1 }}>
                            Yes
                          </Button>
                          <Button onClick={handleClose} variant="contained">
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Popover>
                  </TableCell>
                  <TableCell align="center">
                  <Tooltip title="Edit Alert">
                    <IconButton onClick={() => handleEditAlert(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  </TableCell>
                  <TableCell align="center">
            </TableCell>
                </TableRow>
              )) :
                <TableRow align="center">
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">You have no alerts set up</TableCell>
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
