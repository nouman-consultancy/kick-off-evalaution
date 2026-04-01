"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <Box component={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ py: 10 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h1">Find your perfect AI model with guided discovery</Typography>
        <Typography color="text.secondary">
          Compare top models, understand pricing, and launch your first AI workflow in minutes.
        </Typography>
        <Button variant="contained" size="large">Let&apos;s go</Button>
      </Stack>
    </Box>
  );
}
