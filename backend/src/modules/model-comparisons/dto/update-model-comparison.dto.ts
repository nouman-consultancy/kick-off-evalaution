import { PartialType } from '@nestjs/swagger';
import { CreateModelComparisonDto } from './create-model-comparison.dto';

export class UpdateModelComparisonDto extends PartialType(CreateModelComparisonDto) {}
