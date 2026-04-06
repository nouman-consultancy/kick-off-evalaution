'use client';

import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useGetLabsQuery } from '@/appstore/api/labsApi';
import CommonLoadingState from '@/shared/components/CommonLoadingState';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

export default function BuiltForEveryBuilderSection() {
  const { data, isLoading, isFetching, isError } = useGetLabsQuery({ page: 1, limit: 6 });

  const labs = data?.data ?? [];

  return (
    <Box sx={{ backgroundColor: '#f8fafc', py: 8 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Built for every builder
        </Typography>

        {isLoading || isFetching ? (
          <CommonLoadingState count={6} itemXs={12} itemSm={6} itemMd={4} itemLg={2} />
        ) : isError ? (
          <CommonErrorState
            title="Failed to load features"
            description="Could not fetch labs from the server. Please try again later."
          />
        ) : labs.length === 0 ? (
          <CommonNoDataState
            title="No features available"
            description="No labs have been added yet."
          />
        ) : (
          <Grid container spacing={3}>
            {labs.map((lab) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={lab.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    height: '100%',
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.12)' },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 1.5 }}>
                      {lab.iconUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={lab.iconUrl} alt={lab.name} width={32} height={32} style={{ borderRadius: 6 }} />
                      ) : (
                        <ExtensionIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                      )}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {lab.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lab.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
