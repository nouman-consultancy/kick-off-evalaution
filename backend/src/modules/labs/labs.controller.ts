import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Labs')
@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lab' })
  async create(@Body() createLabDto: CreateLabDto) {
    return this.labsService.create(createLabDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all labs with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.labsService.findAll(page || 1, limit || 10);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active labs' })
  async findActive() {
    return this.labsService.findActive();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get labs by category' })
  async findByCategory(@Param('category') category: string) {
    return this.labsService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lab by ID' })
  async findOne(@Param('id') id: string) {
    return this.labsService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lab' })
  async update(@Param('id') id: string, @Body() updateLabDto: UpdateLabDto) {
    return this.labsService.update(+id, updateLabDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lab' })
  async remove(@Param('id') id: string) {
    return this.labsService.remove(+id);
  }
}
