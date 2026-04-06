'use client';

import { Card, CardContent, Grid, Skeleton } from '@mui/material';

type CommonLoadingStateProps = {
  count?: number;
  itemXs?: number;
  itemSm?: number;
  itemMd?: number;
  itemLg?: number;
};

export default function CommonLoadingState({
  count = 8,
  itemXs = 12,
  itemSm = 6,
  itemMd = 4,
  itemLg = 3,
}: CommonLoadingStateProps) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={itemXs} sm={itemSm} md={itemMd} lg={itemLg} key={`loading-skeleton-${index}`}>
          <Card sx={{ borderRadius: 3, p: 1 }}>
            <CardContent>
              <Skeleton width="45%" height={30} />
              <Skeleton width="30%" height={20} />
              <Skeleton width="100%" height={60} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
