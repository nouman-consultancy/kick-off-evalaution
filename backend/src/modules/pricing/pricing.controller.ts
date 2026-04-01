import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PricingService } from "./pricing.service";

@ApiTags("Pricing")
@Controller("pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  @ApiOperation({ summary: "Get all pricing plans", description: "Returns a list of available pricing plans including Starter, Growth, and Enterprise" })
  @ApiResponse({ status: 200, description: "List of pricing plans retrieved successfully" })
  getAll() {
    return this.pricingService.getAll();
  }
}
