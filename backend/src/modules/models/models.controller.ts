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
  @ApiOperation({ summary: 'Get all models with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.modelsService.findAll(page || 1, limit || 10);
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
