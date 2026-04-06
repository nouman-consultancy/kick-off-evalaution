'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Alert, Box, CircularProgress } from '@mui/material';
import { useLoginMutation } from '@/appstore/api/authApi';
import { setCredentials } from '@/appstore/slices/authSlice';
import { useAppDispatch } from '@/appstore';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      router.push('/dashboard/home');
    } catch (err: any) {
      setError(err.data?.message || 'Invalid email or password');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        {...register('email')}
        label="Email address"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
      </Button>
    </Box>
  );
}