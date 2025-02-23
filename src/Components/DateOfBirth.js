import React from 'react';
import { TextField } from '@mui/material';

const DateOfBirthField = ({ dateOfBirth, handleDateOfBirthChange }) => {
  console.log("DateOfBirthField rendered");
  return (
    <TextField
      required
      fullWidth
      label="Date of birth"
      type="date"
      value={dateOfBirth}
      onChange={handleDateOfBirthChange}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default DateOfBirthField;
