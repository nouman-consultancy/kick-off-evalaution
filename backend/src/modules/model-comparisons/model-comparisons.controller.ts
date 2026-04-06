import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModelComparisonsService } from './model-comparisons.service';
import { CreateModelComparisonDto } from './dto/create-model-comparison.dto';
import { UpdateModelComparisonDto } from './dto/update-model-comparison.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Model Comparisons')
@Controller('model-comparisons')
export class ModelComparisonsController {
  constructor(private readonly comparisonsService: ModelComparisonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new model comparison' })
  async create(@Body() createDto: CreateModelComparisonDto) {
    return this.comparisonsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comparisons with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.comparisonsService.findAll(page || 1, limit || 10);
  }

  @Get('model/:modelId')
  @ApiOperation({ summary: 'Get comparisons by model ID' })
  async findByModel(@Param('modelId') modelId: string) {
    return this.comparisonsService.findByModel(+modelId);
  }

  @Get('lab/:labId')
  @ApiOperation({ summary: 'Get comparisons by lab ID' })
  async findByLab(@Param('labId') labId: string) {
    return this.comparisonsService.findByLab(+labId);
  }

  @Get('model/:modelId/lab/:labId')
  @ApiOperation({ summary: 'Get comparison by model and lab' })
  async findByModelAndLab(
    @Param('modelId') modelId: string,
    @Param('labId') labId: string,
  ) {
    return this.comparisonsService.findByModelAndLab(+modelId, +labId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comparison by ID' })
  async findOne(@Param('id') id: string) {
    return this.comparisonsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comparison' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateModelComparisonDto) {
    return this.comparisonsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comparison' })
  async remove(@Param('id') id: string) {
    return this.comparisonsService.remove(+id);
  }
}
