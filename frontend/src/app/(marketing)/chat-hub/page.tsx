'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const features = [
  {
    icon: ChatIcon,
    title: 'Real-time Messaging',
    description: 'Instant messaging with typing indicators and read receipts.',
  },
  {
    icon: GroupsIcon,
    title: 'Group Chats',
    description: 'Create unlimited group conversations with advanced permissions.',
  },
  {
    icon: SecurityIcon,
    title: 'End-to-End Encryption',
    description: 'Your conversations are secured with military-grade encryption.',
  },
  {
    icon: SpeedIcon,
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-50ms message delivery.',
  },
];

export default function ChatHubPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Chat Hub
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
            The central place for all your conversations
          </Typography>
          <Button
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
            Start Chatting
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 6, fontWeight: 600 }}>
          Powerful Chat Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <feature.icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
