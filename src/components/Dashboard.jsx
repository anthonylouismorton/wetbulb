import React, { useState } from 'react';
import AlertForm from "./AlertForm";
import AlertHistory from "./AlertHistory";
import AlertList from './AlertList';
import AlertFullInfo from './AlertFullInfo';
import { Modal, Box, Grid } from '@mui/material';

export default function Dashboard(props) {
  const [newalert, setAlertForm] = useState(false);
  const [editAlert, setEditAlert] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditAlert = (alert) => {
    setEditAlert(alert);
    setAlertForm(true);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <>
          <AlertFullInfo alert={selectedAlert} />
        </>
      </Modal>
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
          <AlertHistory user={props.user} handleAlertClick={handleAlertClick}/>
        </Grid>
      )}
    </>
  );
}
