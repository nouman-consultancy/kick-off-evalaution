import { Module } from '@nestjs/common';
import { ResearchFeedController } from './research-feed.controller';
import { ResearchFeedService } from './research-feed.service';

@Module({
  controllers: [ResearchFeedController],
  providers: [ResearchFeedService],
  exports: [ResearchFeedService],
})
export class ResearchFeedModule {}
