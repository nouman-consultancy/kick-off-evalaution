'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, TextField, Button, Snackbar, Alert,
  InputAdornment, IconButton, CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useLoginMutation } from '@/appstore/api/authApi';

const FEATURES = [
  { emoji: '🤖', text: '525+ AI models from 30+ labs' },
  { emoji: '⚡', text: 'Custom agent builder with any model' },
  { emoji: '🔗', text: 'Connect tools, memory & APIs' },
  { emoji: '📊', text: 'Real-time analytics & monitoring' },
];

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail]   = useState('demo@nexusai.com');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);

  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setSnack({ open: true, message: 'Please enter your email and password.', severity: 'error' });
      return;
    }
    try {
      const result = await login({ email, password }).unwrap();
      if (typeof window !== 'undefined') localStorage.setItem('token', result.token);
      setSnack({ open: true, message: `Welcome back, ${result.user.firstName ?? result.user.email}!`, severity: 'success' });
      router.push('/home');
    } catch {
      setSnack({ open: true, message: 'Invalid credentials. Try demo@nexusai.com / demo1234', severity: 'error' });
    }
  };

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
            Build Smarter<br />with AI Agents
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center',
            mb: 4, lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
            Access 525+ models, create custom agents, and automate your workflow — all in one platform.
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
          {/* heading */}
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Welcome back</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to your NexusAI account to continue.
          </Typography>

          {/* email */}
          <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.primary' }}>
            Email address
          </Typography>
          <TextField
            fullWidth size="small" type="email"
            placeholder="you@company.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
          />

          {/* password */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Password
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
              Forgot password?
            </Typography>
          </Box>
          <TextField
            fullWidth size="small"
            type={showPw ? 'text' : 'password'}
            placeholder="Enter your password"
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
            sx={{ mb: 3.5, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
          />

          {/* submit */}
          <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading}
            sx={{
              borderRadius: 2, fontWeight: 700, fontSize: 15, py: 1.4,
              boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              '&:hover': { boxShadow: '0 6px 20px rgba(99,102,241,0.45)' },
              '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8', boxShadow: 'none' },
            }}>
            {isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Sign in'}
          </Button>

          {/* register link */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}>
            Don't have an account?{' '}
            <Box component={Link} href="/register"
              sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' } }}>
              Create one →
            </Box>
          </Typography>

          {/* demo hint */}
          <Box sx={{ mt: 3, p: 1.5, bgcolor: '#f0f4ff', borderRadius: 2, border: '1px solid #e0e7ff' }}>
            <Typography variant="caption" sx={{ color: '#4338ca', fontWeight: 600, display: 'block', mb: 0.3 }}>
              Demo credentials
            </Typography>
            <Typography variant="caption" color="text.secondary">
              demo@nexusai.com · demo1234
            </Typography>
          </Box>
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
