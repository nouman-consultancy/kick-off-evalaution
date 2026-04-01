"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";

const cases = [
  { title: "Fintech onboarding", impact: "42% faster support resolution" },
  { title: "Agency content ops", impact: "58% lower production cost" },
  { title: "Startup research", impact: "3x faster insight delivery" },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies">
      <Typography variant="h2" sx={{ my: 4 }}>Case Studies</Typography>
      <Grid container spacing={2}>
        {cases.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">{item.impact}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
