import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ResearchFeedService } from './research-feed.service';

@ApiTags('Research Feed')
@Controller('research-feed')
export class ResearchFeedController {
  constructor(private readonly service: ResearchFeedService) {}

  @Get()
  @ApiOperation({ summary: 'Get research papers with optional filters' })
  @ApiQuery({ name: 'tag', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('tag') tag?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.service.findAll({
      tag,
      search,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single research paper by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }
}
