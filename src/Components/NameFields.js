import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const nameSchema = z.string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(30, { message: 'Name must be at most 30 characters long' })
  .regex(/^[a-zA-Z]+$/, { message: 'Name must only contain letters' });

const schema = z.object({
  firstName: nameSchema,
  lastName: nameSchema
});

export const NameFields = ({ onValidationChange, onFirstNameChange, onLastNameChange }) => {
  const { register, formState: { errors, isValid }, setValue, watch, getValues } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  useEffect(() => onValidationChange(isValid),
    [onValidationChange, isValid]);

  useEffect(() => {
    const { unsubscribe } = watch((values, { name }) => {
      if (name === 'firstName') {
        onFirstNameChange(values.firstName);
      }

      if (name === 'lastName') {
        onLastNameChange(values.lastName);
      }
    });

    return () => unsubscribe();
  }, [watch, onFirstNameChange, onLastNameChange]);

  const normalizeName = (value) => value.trim().replace(/^\w/, c => c.toUpperCase());

  const handleFirstNameBlur = () => {
    const normalizedValue = normalizeName(getValues().firstName);
    setValue('firstName', normalizedValue, { shouldValidate: true });
  };

  const handleLastNameBlur = () => {
    const normalizedValue = normalizeName(getValues().lastName);
    setValue('lastName', normalizedValue, { shouldValidate: true });
  };

  return (
    <Box
      sx={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}
      component="form"
    >
      <TextField
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName ? errors.firstName.message : ''}
        required
        fullWidth
        label="First Name"
        placeholder="Enter first name"
        onBlur={handleFirstNameBlur}
      />

      <TextField
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName ? errors.lastName.message : ''}
        required
        fullWidth
        label="Last Name"
        placeholder="Enter last name"
        onBlur={handleLastNameBlur}
      />
    </Box>
  );
};
