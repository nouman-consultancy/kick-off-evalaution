import { Module } from '@nestjs/common';
import { ModelComparisonsController } from './model-comparisons.controller';
import { ModelComparisonsService } from './model-comparisons.service';

@Module({
  controllers: [ModelComparisonsController],
  providers: [ModelComparisonsService],
  exports: [ModelComparisonsService],
})
export class ModelComparisonsModule {}
