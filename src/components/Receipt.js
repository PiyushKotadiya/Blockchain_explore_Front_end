// Receipt.js

import React from 'react';
import { Paper, Typography } from '@mui/material';

function Receipt({ receipt }) {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Receipt</Typography>
      <Typography variant="body1">Amount: {receipt.amount} ETH</Typography>
      <Typography variant="body1">From: {receipt.from}</Typography>
      <Typography variant="body1">To: {receipt.to}</Typography>
    </Paper>
  );
}

export default Receipt;
