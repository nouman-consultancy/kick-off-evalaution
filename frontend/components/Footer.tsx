"use client";

import { Box, Container, Link, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 4, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
          <Typography>NexusAI Model Marketplace</Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">API</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
