import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, { message: 'Password must contain at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one capital letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'The password must contain at least one number' })
  .regex(/[\W_]/, { message: 'The password must contain at least one special character' });

const PasswordFields = ({
  onValidationChange,
  onValidationConfirmChange,
  showPassword,
  showConfirmPassword,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  handleMouseDownPassword,
  style
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');

  const validatePassword = (newPassword) => {
    try {
      passwordSchema.parse(newPassword);
      setPasswordHelperText('');
      return true;
    } catch (error) {
      setPasswordHelperText(error.errors[0].message);
      return false;
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const isPasswordValid = validatePassword(newPassword);

    validateForm(isPasswordValid, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordHelperText("Passwords don't match");
    } else {
      setConfirmPasswordHelperText('');
    }

    validateForm(passwordHelperText === '', newConfirmPassword === password);
  };

  const validateForm = (isPasswordValid, isConfirmPasswordValid) => {
    const isValid = isPasswordValid && isConfirmPasswordValid;

    onValidationChange(isValid);
    onValidationConfirmChange(isConfirmPasswordValid);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
        <FormControl fullWidth variant="outlined" error={passwordHelperText ? true : false}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide password' : 'show password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{passwordHelperText}</FormHelperText>
        </FormControl>

        <FormControl fullWidth variant="outlined" error={confirmPasswordHelperText ? true : false}>
          <InputLabel htmlFor="outlined-adornment-confirm-password" >
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showConfirmPassword ? 'hide confirm password' : 'show confirm password'}
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
          <FormHelperText>{confirmPasswordHelperText}</FormHelperText>
        </FormControl>
      </Box>
    </>
  );
};

export default PasswordFields;




