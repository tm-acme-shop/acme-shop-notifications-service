import { logger } from '../utils/logger';

export async function sendSms(to: string, message: string): Promise<void> {
  logger.info({ msg: "Sending SMS (v2)", to, messageLength: message.length });

  try {
    await simulateSmsProvider(to, message);
    logger.info({ msg: "SMS sent successfully", to });
  } catch (error) {
    logger.error({ msg: "Failed to send SMS", to, error: String(error) });
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
