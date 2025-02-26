import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import EmailPhoneField from './EmailPhoneField';

export default function ForgotPassword({ open, handleClose }) {
  const [isFormValid, setIsFormValid] = useState(false); 

  const handleValidationChange = (isValid) => {
    setIsFormValid(isValid); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '80%' }}>
        <DialogContentText>
          Enter your account's email address or phone number, and we'll send you a message to reset your password.
        </DialogContentText>
        <EmailPhoneField 
          onValidationChange={handleValidationChange}
        />
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={!isFormValid}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
