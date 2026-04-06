'use client';

import { Box, Typography } from '@mui/material';

type CommonNoDataStateProps = {
  title?: string;
  description?: string;
};

export default function CommonNoDataState({
  title = 'No data found',
  description = 'No records are available at the moment.',
}: CommonNoDataStateProps) {
  return (
    <Box
      sx={{
        border: '1px dashed #d0d4dd',
        borderRadius: 3,
        p: 4,
        textAlign: 'center',
        backgroundColor: '#fafbfc',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
