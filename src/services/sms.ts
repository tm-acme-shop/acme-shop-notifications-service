import { logger } from '../utils/logger';

export interface SmsOptions {
  to: string;
  message: string;
  priority?: 'high' | 'normal' | 'low';
}

export async function sendSms(options: SmsOptions): Promise<void>;
export async function sendSms(to: string, message: string): Promise<void>;
export async function sendSms(
  toOrOptions: string | SmsOptions,
  message?: string
): Promise<void> {
  const options: SmsOptions = typeof toOrOptions === 'string'
    ? { to: toOrOptions, message: message! }
    : toOrOptions;

  logger.info({ msg: "Sending SMS (v2)", to: options.to, messageLength: options.message.length, priority: options.priority || 'normal' });

  try {
    await simulateSmsProvider(options.to, options.message);
    logger.info({ msg: "SMS sent successfully", to: options.to });
  } catch (error) {
    logger.error({ msg: "Failed to send SMS", to: options.to, error: String(error) });
    throw error;
  }
}

/**
 * Send an SMS using the legacy provider.
 * @deprecated Use {@link sendSms} instead.
 * TODO(TEAM-NOTIFICATIONS): Remove legacy SMS path after migration.
 */
export async function sendSmsLegacy(to: string, message: string): Promise<void> {
  logger.warn({ msg: "Using deprecated legacy SMS sender", to });
  console.log("Sending SMS via legacy provider");
  console.log("SMS recipient:", to);
  console.log("SMS message length:", message.length);

  try {
    await simulateSmsProvider(to, message);
    console.log("SMS sent successfully to", to);
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}

async function simulateSmsProvider(to: string, message: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 100));
  logger.info({ msg: "SMS provider responded", to });
}
