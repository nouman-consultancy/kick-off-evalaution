'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import SearchBar from '@/shared/components/SearchBar';
import LandingActionWidgets from '@/shared/components/LandingActionWidgets';
import LandingStatsWidget from '@/shared/components/LandingStatsWidget';
import FeaturedModelsSection from '@/shared/components/FeaturedModelsSection';
import BuiltForEveryBuilderSection from '@/shared/components/BuiltForEveryBuilderSection';
import BrowseByLabSection from '@/shared/components/BrowseByLabSection';

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Welcome to ChatFlow
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            Build, deploy, and scale your AI agents with the most advanced chat platform
          </Typography>

          {/* Search Bar */}
          <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
            <SearchBar />
          </Box>

          <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
            <LandingActionWidgets />
          </Box>

          <Box sx={{ mb: 5, px: { xs: 2, sm: 0 } }}>
            <LandingStatsWidget />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Try Free
            </Button>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      <FeaturedModelsSection />

      <BuiltForEveryBuilderSection />

      <BrowseByLabSection />

      {/* CTA Section */}
      <Box sx={{ backgroundColor: '#f8fafc', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            Ready to get started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of teams already using ChatFlow to power their AI conversations
          </Typography>
          <Button
            component={Link}
            href="/register"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
