'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRegisterMutation } from '@/appstore/api/authApi';
import { setCredentials } from '@/appstore/slices/authSlice';
import { useAppDispatch } from '@/appstore';

const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  firstName: yup.string(),
  lastName: yup.string(),
});

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await register(registerData).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      router.push('/dashboard/home');
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        <Grid xs={6}>
          <TextField
            {...registerField('firstName')}
            label="First Name"
            fullWidth
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            {...registerField('lastName')}
            label="Last Name"
            fullWidth
          />
        </Grid>
      </Grid>

      <TextField
        {...registerField('email')}
        label="Email address"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        {...registerField('password')}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <TextField
        {...registerField('confirmPassword')}
        label="Confirm Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
      </Button>
    </Box>
  );
}