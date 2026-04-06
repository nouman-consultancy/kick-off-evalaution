'use client';

import Link from 'next/link';
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import BoltIcon from '@mui/icons-material/Bolt';
import TokenIcon from '@mui/icons-material/Token';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useGetModelsQuery } from '@/appstore/api/modelsApi';
import CommonLoadingState from '@/shared/components/CommonLoadingState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';
import CommonErrorState from '@/shared/components/CommonErrorState';

const cardGradients = [
  'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
  'linear-gradient(135deg, #faf8ff 0%, #f5f3ff 100%)',
  'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
];

function formatNumber(value?: number): string {
  if (!value) return 'N/A';
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return `${value}`;
}

export default function FeaturedModelsSection() {
  const { data, isLoading, isFetching, isError } = useGetModelsQuery({ page: 1, limit: 8 });

  const models = data?.data ?? [];
  const totalModels = data?.total ?? 0;

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Featured Models
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Browse top AI models from your backend catalog
          </Typography>
        </Box>
        <Link href="/marketplace" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600,
            '&:hover': { textDecoration: 'underline' } }}>
            Browse all {totalModels}+ →
          </Typography>
        </Link>
      </Box>

      {(isLoading || isFetching) && <CommonLoadingState count={8} itemXs={12} itemSm={6} itemMd={4} itemLg={3} />}

      {!isLoading && !isFetching && !isError && models.length > 0 && (
        <Grid container spacing={3}>
          {models.map((model, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={model.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                  background: cardGradients[index % cardGradients.length],
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {model.name}
                    </Typography>
                    <Chip size="small" label={model.provider} />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 44 }}>
                    {model.description || model.bestFor || 'General-purpose AI model'}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                    {model.multimodal && (
                      <Chip icon={<AutoAwesomeIcon />} size="small" label="Multimodal" variant="outlined" />
                    )}
                    {model.speed && <Chip icon={<BoltIcon />} size="small" label={model.speed} variant="outlined" />}
                    <Chip
                      icon={<TokenIcon />}
                      size="small"
                      label={`${formatNumber(model.contextLimit)} ctx`}
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <StarIcon sx={{ color: '#f59e0b', fontSize: 18 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        4.8
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Try →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && !isFetching && !isError && models.length === 0 && (
        <CommonNoDataState
          title="No models found yet"
          description="Add models via your backend `/models` endpoint and they will appear here automatically."
        />
      )}

      {!isLoading && !isFetching && isError && (
        <CommonErrorState
          title="Unable to load featured models"
          description="Please check backend API availability and try again."
        />
      )}
    </Container>
  );
}
