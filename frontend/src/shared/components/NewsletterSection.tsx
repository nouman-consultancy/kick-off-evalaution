'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setEmail('');
    setOpen(true);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubscribe();
  };

  return (
    <>
      <Box sx={{
        background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 55%, #1e1b4b 100%)',
        py: { xs: 8, md: 10 },
        textAlign: 'center',
        px: 2,
      }}>
        {/* eyebrow */}
        <Typography variant="overline" sx={{
          color: '#f59e0b', fontWeight: 700, letterSpacing: '0.12em',
          fontSize: 12, display: 'block', mb: 2,
        }}>
          STAY AHEAD OF THE CURVE
        </Typography>

        {/* headline */}
        <Typography variant="h2" sx={{
          color: '#fff', fontWeight: 800, lineHeight: 1.2,
          fontSize: { xs: '2rem', md: '2.75rem' },
          mb: 2,
        }}>
          New models drop every week.<br />
          Don't miss a release.
        </Typography>

        {/* subtext */}
        <Typography variant="body2" sx={{
          color: 'rgba(255,255,255,0.55)', maxWidth: 480, mx: 'auto',
          lineHeight: 1.75, mb: 4,
        }}>
          Get a curated weekly digest: new model releases, benchmark comparisons, pricing
          changes, and prompt engineering tips — straight to your inbox.
        </Typography>

        {/* input row */}
        <Box sx={{
          display: 'flex', gap: 1.5, maxWidth: 480, mx: 'auto',
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
          <TextField
            fullWidth
            size="small"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            onKeyDown={handleKey}
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f59e0b', borderWidth: 1.5 },
              },
              '& input::placeholder': { color: 'rgba(255,255,255,0.35)', opacity: 1 },
              '& .MuiFormHelperText-root': { color: '#fca5a5' },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubscribe}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: '#f59e0b', color: '#fff', fontWeight: 700, borderRadius: 2,
              px: 3, py: 1, whiteSpace: 'nowrap', flexShrink: 0,
              boxShadow: '0 4px 14px rgba(245,158,11,0.4)',
              '&:hover': { bgcolor: '#d97706', boxShadow: '0 6px 20px rgba(245,158,11,0.5)' },
            }}
          >
            Subscribe free
          </Button>
        </Box>

        {/* trust line */}
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mt: 2 }}>
          No spam. Unsubscribe any time. Trusted by 820+ builders.
        </Typography>

        {/* footer bar */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          maxWidth: 960, mx: 'auto', mt: { xs: 6, md: 8 },
          flexDirection: { xs: 'column', sm: 'row' }, gap: 2,
        }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
            NexusAI Model Marketplace
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Models', 'Research', 'API', 'Privacy', 'Terms'].map((link) => (
              <Typography key={link} variant="caption"
                sx={{ color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
                  '&:hover': { color: 'rgba(255,255,255,0.7)' }, transition: 'color 0.15s' }}>
                {link}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}
          sx={{ borderRadius: 2, fontWeight: 600, bgcolor: '#10b981' }}>
          🎉 You're subscribed! Check your inbox for a confirmation.
        </Alert>
      </Snackbar>
    </>
  );
}
