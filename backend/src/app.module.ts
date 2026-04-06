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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggingModule,
    AuthModule,
    UsersModule,
    ModelsModule,
    LabsModule,
    ModelComparisonsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}