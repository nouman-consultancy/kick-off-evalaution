import { Module } from "@nestjs/common";
import { LeadModule } from "./modules/lead/lead.module";
import { PricingModule } from "./modules/pricing/pricing.module";
import { RoiModule } from "./modules/roi/roi.module";
import { ServicesModule } from "./modules/services/services.module";

@Module({
  imports: [LeadModule, RoiModule, ServicesModule, PricingModule],
})
export class AppModule {}
