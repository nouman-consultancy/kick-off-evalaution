import { Box, Container, Typography } from '@mui/material';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Sign in to your account
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}