import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AgentsService } from './agents.service';

@ApiTags('Agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get('templates')
  @ApiOperation({ summary: 'Get agent templates with optional filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  getTemplates(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.agentsService.getTemplates({ search, category });
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get prompt suggestions, optionally filtered by category' })
  @ApiQuery({ name: 'category', required: false, type: String })
  getSuggestions(@Query('category') category?: string) {
    return this.agentsService.getSuggestions(category);
  }

  @Get('tasks')
  @ApiOperation({ summary: 'Get recent agent tasks' })
  getTasks() {
    return this.agentsService.getTasks();
  }
}
