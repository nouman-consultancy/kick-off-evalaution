import { Injectable } from "@nestjs/common";
import { CalculateRoiDto } from "./dto/calculate-roi.dto";

@Injectable()
export class RoiService {
  calculate(input: CalculateRoiDto) {
    const baselineCost =
      input.teamSize * input.avgHourlyRate * input.hoursPerWeek * 4 +
      input.toolSpendMonthly;
    const projectedCost = baselineCost * 0.7;
    const savingsMonthly = Number((baselineCost - projectedCost).toFixed(2));
    const roiPercent = Number(((savingsMonthly / baselineCost) * 100).toFixed(2));
    return { baselineCost, projectedCost, savingsMonthly, roiPercent };
  }
}
