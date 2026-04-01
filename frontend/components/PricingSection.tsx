"use client";

import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

const plans = [
  { name: "Starter", price: "$29/mo", desc: "Great for solo builders" },
  { name: "Growth", price: "$99/mo", desc: "For product teams" },
  { name: "Enterprise", price: "Custom", desc: "Security and scale" },
];

export default function PricingSection() {
  return (
    <section id="pricing">
      <Typography variant="h2" sx={{ my: 4 }}>Pricing</Typography>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{plan.name}</Typography>
                <Typography variant="h4" sx={{ my: 1 }}>{plan.price}</Typography>
                <Typography color="text.secondary">{plan.desc}</Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained">Choose plan</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
