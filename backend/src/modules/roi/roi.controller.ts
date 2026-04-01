import { Body, Controller, Post } from "@nestjs/common";
import { CalculateRoiDto } from "./dto/calculate-roi.dto";
import { RoiService } from "./roi.service";

@Controller("roi")
export class RoiController {
  constructor(private readonly roiService: RoiService) {}

  @Post("calculate")
  calculate(@Body() input: CalculateRoiDto) {
    return this.roiService.calculate(input);
  }
}
