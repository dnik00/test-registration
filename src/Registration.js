import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import PasswordFields from './Components/PasswordFields';
import ForgotPassword from './Components/ForgotPassword';
import { NameFields } from './Components/NameFields';
import FormComponent from './Components/Form';
import EmailPhoneField from './Components/EmailPhoneField';
import DateOfBirthField from './Components/DateOfBirth';
import RememberMeField from './Components/RememberMeField';
import TermsAndConditionsField from './Components/TermsAndConditionsField';
import RegisterButton from './Components/RegisterButton';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword(prev => !prev), []);
  const handleClickShowConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [emailPhoneValid, setEmailPhoneValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dateOfBirthValid, setDateBirthValid] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');


  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const handleEmailPhoneValidation = (isValid) => {
    setEmailPhoneValid(isValid);
  };
  const handleNameValidation = (isValid) => {
    setNameValid(isValid);
  };

  const handlePasswordValidation = (isValid) => {
    setPasswordValid(isValid);
  };

  const handleConfirmPasswordValidation = (isValid) => {
    setConfirmPasswordValid(isValid);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const isFormValid = emailPhoneValid && nameValid && passwordValid && confirmPasswordValid && termsAccepted && dateOfBirthValid;

  const handleFirstNameChange = (value) => setFirstName(value);
  const handleLastNameChange = (value) => setLastName(value);
  const handleEmailChange = (event) => {
    if (event && event.target) {
      setEmail(event.target.value);
    } else {
      console.error('Event or event.target is undefined');
    }
  };
  const handleDateOfBirthChange = (event) => {
    const dateBirthValue = event.target.value;
    setDateOfBirth(dateBirthValue);
    console.log(dateBirthValue);
    setDateBirthValid(!!dateBirthValue);
  };


  const handleEmailPhoneSubmit = (data) => {
    console.log('Email or Phone submitted:', data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      console.log(`Form submitted! Email: ${email}; first name: ${firstName}, last name: ${lastName}, date of birth ${dateOfBirth}`);
    } else {
      console.log('Form is invalid');
    }
  };

  return (
    <FormComponent>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          padding: '2rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '20px',
          paddingBottom: '40px',
          marginRight: '400px',
        }}
      >
        <Typography gutterBottom variant="h5" align="left" sx={{ lineHeight: '28px' }}>
          Create account
        </Typography>
        <Typography variant="body2" component="p" align="left" sx={{ marginBottom: '50px' }}>
          For business, band or celebrity
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NameFields onValidationChange={handleNameValidation}
            onFirstNameChange={handleFirstNameChange}
            onLastNameChange={handleLastNameChange} />

          <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
            <EmailPhoneField
              onSubmit={handleEmailPhoneSubmit}
              onValidationChange={handleEmailPhoneValidation}
              onEmailChange={handleEmailChange}
            />
            <DateOfBirthField
              dateOfBirth={dateOfBirth}
              handleDateOfBirthChange={handleDateOfBirthChange}
            />
          </Box>

          <PasswordFields
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleClickShowConfirmPassword={handleClickShowConfirmPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            onValidationChange={handlePasswordValidation}
            onValidationConfirmChange={handleConfirmPasswordValidation}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <RememberMeField />

            <TermsAndConditionsField
              termsAccepted={termsAccepted}
              handleTermsChange={handleTermsChange}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
            >
              Forgot your password?
            </Link>
            <ForgotPassword open={open} handleClose={handleClose} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <RegisterButton
            isFormValid={isFormValid}
            firstName={firstName}
            lastName={lastName}
            email={email}
            dateOfBirth={dateOfBirth}
            onSubmit={handleSubmit}
          />
          <Button variant="contained" color="secondary" fullWidth>
            Sign-In with Google
          </Button>
        </Box>

        <Typography variant="body2" align="center" marginTop={2}>
            Don't have an account?{' '}
            <Link href="#" underline="hover">
              Log In
            </Link>
          </Typography>
      </Box>
    </FormComponent >
  );
};

export default Registration;
