import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FlagConditionsTable = () => {
  const flagData = [
    { color: '#FFFFFF', flag: 'White', wbgtIndex: '79.9°F and Below', workRest: 'No specific recommendations', waterConsumption: 'No specific recommendations' },
    { color: '#4caf50', flag: 'Green', wbgtIndex:'80°F - 84.9°F', workRest: 'Periodic rest breaks (e.g., 10-15 minutes per hour)', waterConsumption: 'Regular water consumption to prevent dehydration' },
    { color: '#ffeb3b', flag: 'Yellow', wbgtIndex:'85°F  -87/.9°F', workRest: 'Frequent rest breaks (e.g., 20 minutes per hour)', waterConsumption: 'Increased water consumption to prevent dehydration' },
    { color: '#f44336', flag: 'Red', wbgtIndex:'85°F  -87/.9°F', workRest: 'Work stoppage or postponement', waterConsumption: 'Ample rest and increased fluid intake' },
    { color: '#000000', flag: 'Black', wbgtIndex:'90°F and Above', workRest: 'Work stoppage or postponement', waterConsumption: 'Ample rest and increased fluid intake' },
  ];

  return (
    <Box sx={{ width: '90vw', border: '2px solid black', marginTop: '100px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', border: '2px solid black' }} colSpan={4}>
                Flag Conditions
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>Flag Condition</TableCell>
              <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>WBGT Index</TableCell>
              <TableCell style={{ border: '2px solid black', textAlign: 'center' }}>Work/Rest Recommendations</TableCell>
              <TableCell style={{ border: '2px solid black', textAlign: 'center', borderTop: '2px solid white' }}>Water Consumption Recommendations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flagData.map((row, index) => (
              <TableRow key={row.color} style={{ backgroundColor: row.color }}>
                <TableCell style={{ textAlign: 'center', color: index === flagData.length - 1 ? '#ffffff' : 'inherit', borderRight: index === flagData.length - 1 ? '2px solid white' : '2px solid black' }}>{row.flag}</TableCell>
                <TableCell style={{ textAlign: 'center', color: index === flagData.length - 1 ? '#ffffff' : 'inherit', borderRight: index === flagData.length - 1 ? '2px solid white' : '2px solid black' }}>{row.wbgtIndex}</TableCell>
                <TableCell style={{ textAlign: 'center', color: index === flagData.length - 1 ? '#ffffff' : 'inherit', borderRight: index === flagData.length - 1 ? '2px solid white' : '2px solid black' }}>{row.workRest}</TableCell>
                <TableCell style={{ textAlign: 'center', color: index === flagData.length - 1 ? '#ffffff' : 'inherit', borderRight: index === flagData.length - 1 ? '2px solid white' : '2px solid black' }}>{row.waterConsumption}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlagConditionsTable;
