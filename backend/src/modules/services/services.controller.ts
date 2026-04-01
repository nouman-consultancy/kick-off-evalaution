import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ServicesService } from "./services.service";

@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: "Get all services", description: "Returns a list of available AI consultancy services" })
  @ApiResponse({ status: 200, description: "List of services retrieved successfully" })
  getAll() {
    return this.servicesService.getAll();
  }
}
