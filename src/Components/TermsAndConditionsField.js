import React from 'react';
import { FormControlLabel, Checkbox, Typography, Link } from '@mui/material';

const TermsAndConditionsField = ({ termsAccepted, handleTermsChange }) => (
  <FormControlLabel
    control={<Checkbox checked={termsAccepted} onChange={handleTermsChange} />}
    label={
      <Typography variant="body2" align="left">
        I agree to all the{' '}
        <Link href="#" underline="hover">
          Terms
        </Link>{' '}
        and{' '}
        <Link href="#" underline="hover">
          Privacy policy
        </Link>
      </Typography>
    }
    sx={{ width: '100%', marginTop: '0', marginBottom: '20px' }}
  />
);

export default TermsAndConditionsField;
