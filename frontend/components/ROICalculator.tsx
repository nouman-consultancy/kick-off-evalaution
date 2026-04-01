"use client";

import { useState } from "react";
import { Alert, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoiFormValues, roiSchema } from "@/lib/validations/roiForm";
import { calculateRoi } from "@/lib/api/endpoints";

type RoiResult = {
  savingsMonthly: number;
  roiPercent: number;
};

export default function ROICalculator() {
  const [result, setResult] = useState<RoiResult | null>(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<RoiFormValues>({
    resolver: zodResolver(roiSchema),
    defaultValues: { teamSize: 10, avgHourlyRate: 45, hoursPerWeek: 20, toolSpendMonthly: 800 },
  });

  const onSubmit = async (data: RoiFormValues) => {
    setError("");
    try {
      const res = await calculateRoi(data);
      setResult({ savingsMonthly: res.savingsMonthly, roiPercent: res.roiPercent });
    } catch {
      setError("Could not calculate ROI. Please retry.");
    }
  };

  return (
    <Box component="section" id="roi" sx={{ py: 8 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>ROI Calculator</Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}><TextField label="Team size" fullWidth type="number" {...register("teamSize", { valueAsNumber: true })} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField label="Hourly rate ($)" fullWidth type="number" {...register("avgHourlyRate", { valueAsNumber: true })} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField label="Hours per week" fullWidth type="number" {...register("hoursPerWeek", { valueAsNumber: true })} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField label="Tool spend monthly ($)" fullWidth type="number" {...register("toolSpendMonthly", { valueAsNumber: true })} /></Grid>
          </Grid>
          <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={isSubmitting}>
            {isSubmitting ? "Calculating..." : "Calculate ROI"}
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography>Monthly savings: ${result.savingsMonthly}</Typography>
            <Typography>ROI: {result.roiPercent}%</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
