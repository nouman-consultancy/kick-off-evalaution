import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLabDto {
  @ApiProperty({ example: 'Vision Lab' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Advanced image processing lab' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/lab.png' })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'vision' })
  @IsOptional()
  @IsString()
  category?: string;
}
