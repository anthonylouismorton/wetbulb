import React from 'react';
import Typography from '@mui/material/Typography';

const footerStyles = {
  backgroundColor: '#1976d2',
  padding: '16px',
  textAlign: 'center',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '20px',
  color: '#ffffff'
};

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <Typography>
        The Wet Bulb Globe Temperature Calculator is a product of Prestige Worldwide Web Design LLC, 2023
      </Typography>
    </footer>
  );
};
