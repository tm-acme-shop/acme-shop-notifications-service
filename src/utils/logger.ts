import winston from 'winston';

export interface Logger {
  info(data: Record<string, unknown>): void;
  warn(data: Record<string, unknown>): void;
  error(data: Record<string, unknown>): void;
  debug(data: Record<string, unknown>): void;
}

const winstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'notifications-service' },
  transports: [
    new winston.transports.Console(),
  ],
});

// PLAT-035: Structured logger for notifications service (2023-01)
class StructuredLogger implements Logger {
  info(data: Record<string, unknown>): void {
    winstonLogger.info(data.msg as string, data);
  }
  
  warn(data: Record<string, unknown>): void {
    winstonLogger.warn(data.msg as string, data);
  }
  
  error(data: Record<string, unknown>): void {
    winstonLogger.error(data.msg as string, data);
  }

  debug(data: Record<string, unknown>): void {
    winstonLogger.debug(data.msg as string, data);
  }
}

export const logger = new StructuredLogger();
