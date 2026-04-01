import { Module } from "@nestjs/common";
import { LeadModule } from "./modules/lead/lead.module";
import { PricingModule } from "./modules/pricing/pricing.module";
import { ServicesModule } from "./modules/services/services.module";

@Module({
  imports: [LeadModule, ServicesModule, PricingModule],
})
export class AppModule {}
