"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";

const items = [
  "Too many models, no clear choice",
  "Unclear pricing and ROI",
  "Slow onboarding for non-technical teams",
];

export default function ProblemSection() {
  return (
    <section id="problem">
      <Typography variant="h2" sx={{ mb: 3 }}>Why teams get stuck</Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography>{item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
