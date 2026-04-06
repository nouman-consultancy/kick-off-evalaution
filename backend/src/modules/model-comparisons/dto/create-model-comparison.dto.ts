import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModelComparisonDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  modelId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  labId: number;

  @ApiPropertyOptional({ example: '128K' })
  @IsOptional()
  @IsString()
  contextInput?: string;

  @ApiPropertyOptional({ example: '32K' })
  @IsOptional()
  @IsString()
  output?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  multimodal?: boolean;

  @ApiPropertyOptional({ example: 'fast' })
  @IsOptional()
  @IsString()
  speed?: string;

  @ApiPropertyOptional({ example: 'Complex reasoning tasks' })
  @IsOptional()
  @IsString()
  bestFor?: string;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  benchmarkScore?: number;
}
