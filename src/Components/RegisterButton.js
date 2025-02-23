import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const RegisterButton = ({ isFormValid, firstName, lastName, email, dateOfBirth, onSubmit }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => setOpenDialog(false);

  const handleClickRegister = (event) => {
    event.preventDefault();
    if (isFormValid) {
      onSubmit(event);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClickRegister}
        disabled={!isFormValid}
      >
        Create account
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Congratulations, {firstName} {lastName}! You have successfully registered.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '10px' }}>
            Date of Birth: {dateOfBirth}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '10px' }}>
            Email: {email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default RegisterButton;