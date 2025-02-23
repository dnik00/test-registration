import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

const RememberMeField = () => (
  <FormControlLabel
    control={<Checkbox defaultChecked />}
    label={
      <Typography variant="body2" align="center">
        Remember me
      </Typography>
    }
  />
);

export default RememberMeField;
