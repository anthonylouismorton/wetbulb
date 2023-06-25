import React, { useState } from 'react';
import AlertForm from "./AlertForm/AlertForm";
import AlertHistory from "./AlertHistory";
import AlertList from './AlertList';
import AlertFullInfo from './AlertFullInfo';
import { Modal, Box, Grid } from '@mui/material';

export default function Dashboard(props) {
  const [alertForm, setAlertForm] = useState(false);
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
      {alertForm && (
        <AlertForm
          setAlertForm={setAlertForm}
          editAlert={editAlert}
          setEditAlert={setEditAlert}
        />
      )}
      {!alertForm && (
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: '50px',
            rowGap: '20px'

          }}
        >
          <Grid>
          <AlertList
            user={props.user}
            setAlertForm={setAlertForm}
            editAlert={handleEditAlert}
          />
          </Grid>
          <Grid>
          <AlertHistory user={props.user} handleAlertClick={handleAlertClick}/>
          </Grid>
        </Grid>
      )}
    </>
  );
}
