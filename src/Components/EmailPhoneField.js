import React, { useState, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const schema = z.object({
  emailOrPhone: z.string()
    .refine(value => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return true;
      }

      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    }, {
      message: 'Invalid format. Please provide either a correct email or phone number.',
    }),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

const EmailPhoneField = ({ onValidationChange, onEmailChange }) => { 
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const [inputValue, setInputValue] = useState('');
  const [isFieldTouched, setIsFieldTouched] = useState(false); 

  const handleBlur = (event) => {
    if (event && event.target) {
      const normalizedValue = normalizePhoneNumber(event.target.value);
      setValue('emailOrPhone', normalizedValue, { shouldValidate: true });
      setInputValue(normalizedValue);
    }
  };

  const handleValidation = useCallback(() => {
    const isValid = !errors.emailOrPhone && inputValue.length > 0;
    onValidationChange(isValid); 
  }, [errors.emailOrPhone, inputValue, onValidationChange]); 


  const handleEmailChange = (event) => {
    if (event && event.target) {  
      setInputValue(event.target.value);
      setIsFieldTouched(true);
      if (onEmailChange) {
        onEmailChange(event); 
      }
    } else {
      console.error('Event or event.target is undefined');
    }
  };

  useEffect(() => {
    if (isFieldTouched) {
      handleValidation(); 
    }
  }, [inputValue, isFieldTouched, handleValidation]); 

  return (
    <TextField
      {...register('emailOrPhone')}
      value={inputValue} 
      error={!!errors.emailOrPhone}
      helperText={errors.emailOrPhone ? errors.emailOrPhone.message : ''}
      onBlur={handleBlur}
      onChange={handleEmailChange} 
      required
      fullWidth
      label="Email or Phone number"
      placeholder="Enter email or phone number"
    />
  );
};

export default EmailPhoneField;
