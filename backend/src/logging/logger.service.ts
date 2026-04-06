import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string) {
    console.log(`[LOG] ${message}`, context ? `{ context: ${context} }` : '');
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR] ${message}`, trace, context ? `{ context: ${context} }` : '');
  }

  warn(message: string, context?: string) {
    console.warn(`[WARN] ${message}`, context ? `{ context: ${context} }` : '');
  }

  debug(message: string, context?: string) {
    console.debug(`[DEBUG] ${message}`, context ? `{ context: ${context} }` : '');
  }

  verbose(message: string, context?: string) {
    console.log(`[VERBOSE] ${message}`, context ? `{ context: ${context} }` : '');
  }
}