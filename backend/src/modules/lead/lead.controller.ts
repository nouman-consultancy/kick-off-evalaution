import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { LeadService } from "./lead.service";

@ApiTags("Leads")
@Controller("lead")
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @ApiOperation({ summary: "Create a new lead", description: "Submits a new lead inquiry with contact details and message" })
  @ApiResponse({ status: 201, description: "Lead created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() input: CreateLeadDto) {
    return this.leadService.create(input);
  }
}
