import React from 'react';
import Typography from '@mui/material/Typography';

const footerStyles = {
  backgroundColor: 'rgba(25, 118, 210, 0.9)',
  padding: '16px',
  textAlign: 'center',
  position: 'sticky',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '15px',
  marginTop: '20px',
  color: '#ffffff',
  zIndex: 9999,
  
};

export default function Footer() {
  return (
    <footer style={footerStyles}>
      <Typography sx={{ fontSize: '12px' }}>
        The Wet Bulb Globe Temperature Calculator is a product of Prestige Worldwide Web Design LLC, 2023
      </Typography>
    </footer>
  );
};
