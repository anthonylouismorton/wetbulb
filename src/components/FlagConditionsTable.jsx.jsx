import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FlagConditionsTable = () => {
  const flagData = [
    { color: '#4caf50', range: '< 77°F (< 25°C)', workRest: 'No specific recommendations', waterConsumption: 'No specific recommendations' },
    { color: '#ffeb3b', range: '77°F - 86°F (25°C - 30°C)', workRest: 'Periodic rest breaks (e.g., 10-15 minutes per hour)', waterConsumption: 'Regular water consumption to prevent dehydration' },
    { color: '#f44336', range: '> 86°F (> 30°C)', workRest: 'Frequent rest breaks (e.g., 20 minutes per hour)', waterConsumption: 'Increased water consumption to prevent dehydration' },
    { color: '#000000', range: 'Extreme conditions or emergencies', workRest: 'Work stoppage or postponement', waterConsumption: 'Ample rest and increased fluid intake' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Flag Conditions
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Temperature Range</TableCell>
            <TableCell>Work/Rest Recommendations</TableCell>
            <TableCell>Water Consumption Recommendations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flagData.map((row) => (
            <TableRow key={row.color} style={{ backgroundColor: row.color }}>
              <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>{row.range}</TableCell>
              <TableCell>{row.workRest}</TableCell>
              <TableCell>{row.waterConsumption}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlagConditionsTable;
