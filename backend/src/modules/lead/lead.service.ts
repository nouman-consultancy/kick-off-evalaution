import { Injectable } from "@nestjs/common";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Injectable()
export class LeadService {
  create(input: CreateLeadDto) {
    return { success: true, leadId: `lead_${Date.now()}`, ...input };
  }
}
