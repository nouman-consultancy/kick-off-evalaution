import { RoiFormValues } from "@/lib/validations/roiForm";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function calculateRoi(input: RoiFormValues) {
  const response = await fetch(`${API_BASE}/roi/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error("ROI calculation failed");
  }
  return response.json();
}
