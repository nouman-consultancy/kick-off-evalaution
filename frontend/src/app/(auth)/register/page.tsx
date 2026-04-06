'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, TextField, Button, Snackbar, Alert,
  InputAdornment, IconButton, CircularProgress, Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRegisterMutation } from '@/appstore/api/authApi';

const FEATURES = [
  { emoji: '🚀', text: 'Get started in under 2 minutes' },
  { emoji: '🤖', text: '525+ AI models from 30+ labs' },
  { emoji: '⚡', text: 'Custom agent builder with any model' },
  { emoji: '🔒', text: 'Enterprise-grade security & privacy' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);

  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !firstName.trim()) {
      setSnack({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }
    if (password.length < 6) {
      setSnack({ open: true, message: 'Password must be at least 6 characters.', severity: 'error' });
      return;
    }
    try {
      const result = await register({ email, password, firstName, lastName }).unwrap();
      if (typeof window !== 'undefined') localStorage.setItem('token', result.token);
      setSnack({ open: true, message: `Account created! Welcome, ${result.user.firstName}!`, severity: 'success' });
      router.push('/home');
    } catch (err: any) {
      const msg = err?.data?.message ?? 'Registration failed. That email may already be in use.';
      setSnack({ open: true, message: msg, severity: 'error' });
    }
  };

  // password strength
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981'];

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: '#f8fafc', p: { xs: 2, md: 0 },
    }}>
      <Box sx={{
        display: 'flex', borderRadius: '16px', overflow: 'hidden',
        width: '100%', maxWidth: 880,
        boxShadow: '0 8px 40px rgba(15,23,42,0.12)',
        border: '1px solid #e2e8f0',
      }}>

        {/* ── left panel ── */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
          width: 340, flexShrink: 0,
          background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          p: 4, position: 'relative', overflow: 'hidden',
        }}>
          {/* glow */}
          <Box sx={{
            position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5, position: 'relative', zIndex: 1 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#6366f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box component="span" sx={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>◆</Box>
            </Box>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.3px' }}>
              NexusAI
            </Typography>
          </Box>

          {/* illustration */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
            <Box sx={{
              width: 130, height: 130, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(30,27,75,0.7) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <SmartToyIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.9)' }} />
            </Box>
          </Box>

          {/* headline */}
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, lineHeight: 1.25,
            mb: 1.5, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            Start Building<br />for Free
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center',
            mb: 4, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            Join thousands of builders using NexusAI to create intelligent agents and automate workflows.
          </Typography>

          {/* features */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, position: 'relative', zIndex: 1 }}>
            {FEATURES.map((f) => (
              <Box key={f.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'rgba(99,102,241,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                  {f.emoji}
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                  {f.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── right panel ── */}
        <Box component="form" onSubmit={handleSubmit} sx={{
          flex: 1, bgcolor: '#fff', p: { xs: 3, md: 5 },
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Create your account</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
            Join NexusAI and start building with 525+ AI models.
          </Typography>

          {/* name row */}
          <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.primary' }}>
                First name <Box component="span" sx={{ color: 'error.main' }}>*</Box>
              </Typography>
              <TextField
                fullWidth size="small" placeholder="Jane"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.primary' }}>
                Last name
              </Typography>
              <TextField
                fullWidth size="small" placeholder="Smith"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
              />
            </Grid>
          </Grid>

          {/* email */}
          <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.primary' }}>
            Email address <Box component="span" sx={{ color: 'error.main' }}>*</Box>
          </Typography>
          <TextField
            fullWidth size="small" type="email" placeholder="you@company.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
          />

          {/* password */}
          <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.primary' }}>
            Password <Box component="span" sx={{ color: 'error.main' }}>*</Box>
          </Typography>
          <TextField
            fullWidth size="small"
            type={showPw ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            value={password} onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPw(!showPw)} edge="end">
                    {showPw
                      ? <VisibilityOffIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                      : <VisibilityIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
          />

          {/* password strength */}
          {password.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                {[1, 2, 3].map((s) => (
                  <Box key={s} sx={{
                    flex: 1, height: 3, borderRadius: 2,
                    bgcolor: strength >= s ? strengthColor[strength] : '#e2e8f0',
                    transition: 'background 0.2s',
                  }} />
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: strengthColor[strength], fontWeight: 600, minWidth: 40 }}>
                {strengthLabel[strength]}
              </Typography>
            </Box>
          )}

          {/* submit */}
          <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading}
            sx={{
              borderRadius: 2, fontWeight: 700, fontSize: 15, py: 1.4, mb: 2,
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.45)' },
              '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' },
            }}>
            {isLoading
              ? <CircularProgress size={20} sx={{ color: '#fff' }} />
              : <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 18 }} /> Create free account
                </Box>
            }
          </Button>

          {/* terms */}
          <Typography variant="caption" color="text.disabled" sx={{ textAlign: 'center', mb: 2.5, lineHeight: 1.6 }}>
            By creating an account you agree to our{' '}
            <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>Terms of Service</Box>
            {' '}and{' '}
            <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>Privacy Policy</Box>.
          </Typography>

          {/* login link */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Already have an account?{' '}
            <Box component={Link} href="/login"
              sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' } }}>
              Sign in →
            </Box>
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={snack.open} autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 2, fontWeight: 600 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
