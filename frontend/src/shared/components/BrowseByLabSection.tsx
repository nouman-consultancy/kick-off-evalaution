'use client';

import { Box, Card, CardContent, Container, Grid, Link, Typography } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetLabsQuery } from '@/appstore/api/labsApi';
import { useGetAllModelsQuery } from '@/appstore/api/modelsApi';
import CommonLoadingState from '@/shared/components/CommonLoadingState';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

export default function BrowseByLabSection() {
  const {
    data: labsData,
    isLoading: labsLoading,
    isFetching: labsFetching,
    isError: labsError,
  } = useGetLabsQuery({ page: 1, limit: 100 });

  const {
    data: allModels = [],
    isLoading: modelsLoading,
    isError: modelsError,
  } = useGetAllModelsQuery();

  const labs = labsData?.data ?? [];
  const isLoading = labsLoading || labsFetching || modelsLoading;
  const isError = labsError || modelsError;

  // group model names by provider (matched to lab name)
  const modelsByProvider = allModels.reduce<Record<string, string[]>>((acc, model) => {
    const key = model.provider.toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(model.name);
    return acc;
  }, {});

  return (
    <Box sx={{ backgroundColor: '#fff', py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Browse by AI Lab
          </Typography>
          <Link
            href="/marketplace"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'error.main', fontWeight: 500, fontSize: 14 }}
          >
            See all labs <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>

        {isLoading ? (
          <CommonLoadingState count={9} itemXs={6} itemSm={4} itemMd={3} itemLg={2} />
        ) : isError ? (
          <CommonErrorState
            title="Failed to load labs"
            description="Could not fetch labs from the server. Please try again later."
          />
        ) : labs.length === 0 ? (
          <CommonNoDataState title="No labs available" description="No AI labs have been added yet." />
        ) : (
          <Grid container spacing={2}>
            {labs.map((lab) => {
              const models = modelsByProvider[lab.name.toLowerCase()] ?? [];
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={lab.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: '1px solid #e2e8f0',
                      boxShadow: 'none',
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.10)' },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ mb: 1.5 }}>
                        {lab.iconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={lab.iconUrl}
                            alt={lab.name}
                            width={36}
                            height={36}
                            style={{ borderRadius: 8, objectFit: 'contain' }}
                          />
                        ) : (
                          <ExtensionIcon sx={{ fontSize: 36, color: 'primary.main' }} />
                        )}
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {lab.name}
                      </Typography>
                      {models.length > 0 ? (
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                          {models.slice(0, 3).join(', ')}
                          {models.length > 3 ? `, +${models.length - 3} more` : ''}
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.disabled">
                          No models yet
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
