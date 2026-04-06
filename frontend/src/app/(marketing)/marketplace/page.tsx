'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';

const categories = [
  { name: 'AI Assistants', count: 234 },
  { name: 'Chatbots', count: 189 },
  { name: 'Integrations', count: 156 },
  { name: 'Templates', count: 98 },
];

const featuredItems = [
  {
    name: 'Customer Support Pro',
    description: 'AI-powered customer support agent with multi-language support',
    price: '$49/month',
    rating: 4.9,
    reviews: 128,
    category: 'AI Assistants',
  },
  {
    name: 'Sales Assistant',
    description: 'Automated sales outreach and lead qualification agent',
    price: '$79/month',
    rating: 4.8,
    reviews: 96,
    category: 'AI Assistants',
  },
  {
    name: 'E-commerce Bot',
    description: 'Complete e-commerce solution with order tracking and recommendations',
    price: '$39/month',
    rating: 4.7,
    reviews: 215,
    category: 'Chatbots',
  },
];

export default function MarketplacePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <StorefrontIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Marketplace
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
            Discover AI agents and integrations built by the community
          </Typography>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} sm={3} key={category.name}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} items
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Items */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Featured
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {featuredItems.map((item) => (
            <Grid item xs={12} md={4} key={item.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={item.category} size="small" color="primary" variant="outlined" />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VerifiedIcon color="success" fontSize="small" />
                      <Typography variant="caption">{item.rating}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.reviews} reviews
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                    {item.price}
                  </Typography>
                  <Button variant="contained" size="small">
                    Install
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
