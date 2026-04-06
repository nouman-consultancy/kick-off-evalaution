'use client';

import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

const stats: StatItem[] = [
  { value: '525+', label: 'AI Models' },
  { value: '82K', label: 'Builders' },
  { value: '28', label: 'AI Labs' },
  { value: '4.8', label: 'Avg Rating', highlight: true },
];

export default function LandingStatsWidget() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: { xs: 3, md: 7 },
        mt: 1,
      }}
    >
      {stats.map((item) => (
        <Box key={item.label} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              {item.value}
            </Typography>
            {item.highlight && <StarIcon sx={{ color: '#f59e0b', fontSize: 28 }} />}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
