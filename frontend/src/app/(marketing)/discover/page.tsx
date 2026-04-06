'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const trendingTopics = [
  { name: 'GPT-4 Integration', category: 'AI Models', users: '12.5k' },
  { name: 'WhatsApp Bots', category: 'Channels', users: '8.2k' },
  { name: 'Voice Agents', category: 'Voice', users: '6.8k' },
  { name: 'Analytics Pro', category: 'Tools', users: '5.4k' },
];

const featuredDiscoveries = [
  {
    title: 'Enterprise AI Suite',
    description: 'Complete AI solution for large organizations with compliance features',
    image: '/api/placeholder/400/200',
    category: 'Enterprise',
    badge: 'Popular',
  },
  {
    title: 'Multi-Channel Bot',
    description: 'Deploy across WhatsApp, Slack, Discord, and more from one dashboard',
    image: '/api/placeholder/400/200',
    category: 'Integration',
    badge: 'New',
  },
  {
    title: 'AI Analytics Dashboard',
    description: 'Real-time insights into your conversations and agent performance',
    image: '/api/placeholder/400/200',
    category: 'Analytics',
    badge: 'Trending',
  },
];

export default function DiscoverPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <ExploreIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Discover Now
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
            Explore the latest AI innovations and trending solutions
          </Typography>
          <TextField
            placeholder="Search agents, templates, integrations..."
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              width: { xs: '100%', sm: '500px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* Trending Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Trending Now
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {trendingTopics.map((topic) => (
            <Grid item xs={12} sm={6} md={3} key={topic.name}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {topic.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={topic.category} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {topic.users} users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Discoveries */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <NewReleasesIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Featured
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {featuredDiscoveries.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card
                sx={{
                  height: '100%',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 160,
                    background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)} 0%, #${Math.floor(Math.random()*16777215).toString(16)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ExploreIcon sx={{ fontSize: 64, color: 'white', opacity: 0.8 }} />
                </CardMedia>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                      label={item.badge}
                      size="small"
                      color={item.badge === 'New' ? 'success' : item.badge === 'Popular' ? 'error' : 'primary'}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {item.category}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
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
