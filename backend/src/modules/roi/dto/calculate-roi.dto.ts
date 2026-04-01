import { IsNumber, Min } from "class-validator";

export class CalculateRoiDto {
  @IsNumber()
  @Min(1)
  teamSize!: number;

  @IsNumber()
  @Min(1)
  avgHourlyRate!: number;

  @IsNumber()
  @Min(1)
  hoursPerWeek!: number;

  @IsNumber()
  @Min(0)
  toolSpendMonthly!: number;
}
