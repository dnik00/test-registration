import React from 'react';
import { Card, CardContent, Grid, Avatar, Typography } from '@mui/material';
import picture from './Picture.png';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

const FormComponent = ({ children, style }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
      <Card style={{ height: '100%', width: '100%' }}>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12} sm={5} style={{ height: '100%' }}>
            <img
              src={picture}
              alt="Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>

          <Grid item xs={12} sm={7} style={{ height: '100%' }}>
            <Grid container spacing={2} alignItems="right" sx={{ mt: 3 }}>
              <Grid item>
                <Avatar sx={{ ml: 5 }}>
                  <AppRegistrationRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6" alignItems="left">
                  Logo
                </Typography>
              </Grid>
            </Grid>

            <CardContent style={{ height: '100%', marginRight: '100px' }}>
              {children}
            </CardContent>
          </Grid>
        </Grid>
      </Card>

    </div>
  );
};

export default FormComponent;
