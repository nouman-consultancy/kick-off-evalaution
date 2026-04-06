import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty({ example: 'GPT-4' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'OpenAI' })
  @IsString()
  provider: string;

  @ApiPropertyOptional({ example: 'Advanced language model' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contextInput?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  output?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  multimodal?: boolean;

  @ApiPropertyOptional({ example: 'medium' })
  @IsOptional()
  @IsString()
  speed?: string;

  @ApiPropertyOptional({ example: 'Complex tasks' })
  @IsOptional()
  @IsString()
  bestFor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  contextLimit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxOutputTokens?: number;

  @ApiPropertyOptional({ example: 'https://example.com/model.png' })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
