import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ModelsModule } from './modules/models/models.module';
import { LabsModule } from './modules/labs/labs.module';
import { ModelComparisonsModule } from './modules/model-comparisons/model-comparisons.module';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';

import { ResearchFeedModule } from './modules/research-feed/research-feed.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    LoggingModule, AuthModule, UsersModule, ModelsModule, LabsModule,
    ModelComparisonsModule, HealthModule, ResearchFeedModule, AgentsModule, ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}