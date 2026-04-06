import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Models')
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new model' })
  async create(@Body() createModelDto: CreateModelDto) {
    return this.modelsService.create(createModelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all models with filters and pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'providers', required: false, type: String })
  @ApiQuery({ name: 'tags', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'pricingModel', required: false, type: String })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('providers') providers?: string,
    @Query('tags') tags?: string,
    @Query('category') category?: string,
    @Query('minRating') minRating?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('pricingModel') pricingModel?: string,
  ) {
    return this.modelsService.findAll(page || 1, limit || 12, {
      search,
      providers: providers ? providers.split(',') : undefined,
      tags: tags ? tags.split(',') : undefined,
      category,
      minRating: minRating ? Number(minRating) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pricingModel: pricingModel ? pricingModel.split(',') : undefined,
    });
  }

  @Get('comparison')
  @ApiOperation({ summary: 'Get top 10 flagship models for comparison table' })
  getComparison() {
    return this.modelsService.getComparison();
  }

  @Get('provider/:provider')
  @ApiOperation({ summary: 'Get models by provider' })
  async findByProvider(@Param('provider') provider: string) {
    return this.modelsService.findByProvider(provider);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get model by ID' })
  async findOne(@Param('id') id: string) {
    return this.modelsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update model' })
  async update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelsService.update(+id, updateModelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete model' })
  async remove(@Param('id') id: string) {
    return this.modelsService.remove(+id);
  }
}
