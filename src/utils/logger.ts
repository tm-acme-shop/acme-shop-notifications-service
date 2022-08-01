export interface Logger {
  info(data: Record<string, unknown>): void;
  warn(data: Record<string, unknown>): void;
  error(data: Record<string, unknown>): void;
}

class StructuredLogger implements Logger {
  info(data: Record<string, unknown>): void {
    console.log(JSON.stringify({ level: 'info', timestamp: new Date().toISOString(), ...data }));
  }
  
  warn(data: Record<string, unknown>): void {
    console.warn(JSON.stringify({ level: 'warn', timestamp: new Date().toISOString(), ...data }));
  }
  
  error(data: Record<string, unknown>): void {
    console.error(JSON.stringify({ level: 'error', timestamp: new Date().toISOString(), ...data }));
  }
}

export const logger = new StructuredLogger();
