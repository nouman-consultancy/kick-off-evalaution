"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";

const services = [
  "Guided discovery chat",
  "Prompt engineering guide",
  "Agent builder templates",
  "Transparent pricing",
];

export default function ServicesSection() {
  return (
    <section id="services">
      <Typography variant="h2" sx={{ my: 4 }}>Services</Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid key={service} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography>{service}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
