import { Module } from '@nestjs/common';
// Temporarily disabled DB wiring (local dev without Postgres).
// Re-enable TypeORM config when Postgres is available.

@Module({
  imports: [],
})
export class DatabaseModule {}

