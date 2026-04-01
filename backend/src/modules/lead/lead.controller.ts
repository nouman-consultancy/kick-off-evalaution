import { Body, Controller, Post } from "@nestjs/common";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { LeadService } from "./lead.service";

@Controller("lead")
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() input: CreateLeadDto) {
    return this.leadService.create(input);
  }
}
