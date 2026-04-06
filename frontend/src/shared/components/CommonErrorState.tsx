'use client';

import { Box, Typography } from '@mui/material';

type CommonErrorStateProps = {
  title?: string;
  description?: string;
};

export default function CommonErrorState({
  title = 'Unable to load data',
  description = 'Please check backend API availability and try again.',
}: CommonErrorStateProps) {
  return (
    <Box
      sx={{
        border: '1px solid #fecaca',
        borderRadius: 3,
        p: 3,
        textAlign: 'center',
        backgroundColor: '#fff1f2',
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600, color: '#b91c1c' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#7f1d1d', mt: 0.5 }}>
        {description}
      </Typography>
    </Box>
  );
}
