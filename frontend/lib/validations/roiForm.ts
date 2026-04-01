import { z } from "zod";

export const roiSchema = z.object({
  teamSize: z.number().min(1),
  avgHourlyRate: z.number().min(1),
  hoursPerWeek: z.number().min(1),
  toolSpendMonthly: z.number().min(0),
});

export type RoiFormValues = z.infer<typeof roiSchema>;
